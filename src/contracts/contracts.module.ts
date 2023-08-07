import assert from 'assert';
import Web3 from 'web3';
import { Core } from './Core';
import { CoreConfiguration } from './CoreConfiguration';
import { Erc20 } from './Erc20';
import { ILogger } from '../logger';
import { GasStation } from './gas-station';
import { obtainLog } from './log.utils';
import { Src, applyDecimals, removeDecimals } from '../utils/decimals.utils';
import Big from 'big.js';
import type { IRawApi } from '../api';
import { PythCryptoOracle } from './PythCryptoOracle';

type OrderId = number;
enum Direction {
  Up,
  Down,
}
const AllowedPercentValues = [5, 3, 1, 0.5, 0.25, 0.1, -0.1, -0.25, -0.5, -1, -3, -5, 'UP', 'DOWN'] as const;
type AllowedPercentValue = (typeof AllowedPercentValues)[number];
const AllowedDurationValues = ['15m', '30m', '1h', '2h', '4h', '8h', '24h'] as const;
type AllowedDurationValue = (typeof AllowedDurationValues)[number];
const DurationMap: Record<AllowedDurationValue, number> = {
  '15m': 15 * 60,
  '30m': 30 * 60,
  '1h': 60 * 60,
  '2h': 2 * 60 * 60,
  '4h': 4 * 60 * 60,
  '8h': 8 * 60 * 60,
  '24h': 24 * 60 * 60
}

const PRECISION = Big(1e18);

interface ILimitsConfiguration {
  minKeeperFee: string;
  minOrderRate: string;
  maxOrderRate: string;
  minDuration: string;
  maxDuration: string;
  maxAutoResolveDuration: string;
}

interface IFeeConfiguration {
  feeRecipient: string;
  autoResolveFee: string;
  protocolFee: string;
  flashloanFee: string;
}

interface ICreateOrder {
  oracle: string;
  direction: Direction;
  duration: (typeof AllowedDurationValues)[number];
  percent: (typeof AllowedPercentValues)[number];
  reinvest: boolean;
  /**
   * Number multiplied by 1e16. 
   * @example 1=1e16 10=1e17 100=1e18
   */
  rate: number;
  /**
   * @example 10.24 ($10.24)
   */
  amount: number;
}

export interface OptionsContractsCtorParams {
  rpc: string;
  logger?: ILogger;
  privateKey: string;
  address: {
    core: string;
    stable: string;
    coreConfiguration: string;
  };
  gasRiskFactor: {
    price: BigInt,
    limit: BigInt,
  },
  /**
   * If provided the backend will be notified about most actions, so it will appear on the front-end near instantly
   */
  rawApi?: IRawApi;
}

export class OptionContracts {
  protected web3: Web3;
  protected logger: ILogger;
  protected rawApi?: IRawApi;

  sender: string;
  gasStation: GasStation;

  core: Core.Contract;
  coreConfiguration: CoreConfiguration.Contract;
  stable: Erc20.Contract;

  Direction = Direction;

  constructor(params: OptionsContractsCtorParams) {
    this.logger = params.logger ?? console;
    this.rawApi = params.rawApi;

    this.web3 = new Web3(params.rpc);
    this.gasStation = new GasStation({ logger: this.logger, web3: this.web3 });

    const account = this.web3.eth.accounts.wallet.add(params.privateKey);
    this.sender = account.address;

    const contractOptions = { from: this.sender };
    this.core = new Core.Contract(this.web3, params.address.core, contractOptions);
    this.stable = new Erc20.Contract(this.web3, params.address.stable, contractOptions);
    this.coreConfiguration = new CoreConfiguration.Contract(this.web3, params.address.coreConfiguration, contractOptions);
  }

  #stableDecimals?: Promise<number>;
  get stableDecimals() {
    if (this.#stableDecimals) {
      return this.#stableDecimals;
    }
    this.#stableDecimals = this.stable.methods.decimals().call()
      .then((v) => Number(v))
      .catch((e) => {
        this.#stableDecimals = undefined;
        throw e;
      })
    return this.#stableDecimals;
  }

  #feeConfiguration?: Promise<IFeeConfiguration>;
  get feeConfiguration() {
    if (this.#feeConfiguration) {
      return this.#feeConfiguration;
    }
    this.#feeConfiguration = this.coreConfiguration.methods.feeConfiguration().call()
      .catch((e) => {
        this.#feeConfiguration = undefined;
        throw e;
      })
    return this.#feeConfiguration;
  }

  #limitsConfiguration?: Promise<ILimitsConfiguration>;
  get limitsConfiguration() {
    if (this.#limitsConfiguration) {
      return this.#limitsConfiguration;
    }
    this.#limitsConfiguration = this.coreConfiguration.methods.limitsConfiguration().call()
      .catch((e) => {
        this.#limitsConfiguration = undefined;
        throw e;
      })
    return this.#limitsConfiguration;
  }

  async createOrder(
    data: ICreateOrder
  ) {
    const percent = this.#parsePercent(data.percent);
    const duration = this.#parseDuration(data.duration);
    const rate = await this.#parseRate(data.rate);
    const amount = await this.#parseStableAmount(data.amount);
    await this.#validateOrderAmount(Big(amount), Big(rate));
    await this.#approve(amount);
    const description: Core.Web3.ICore.OrderDescriptionStruct = {
      oracle: data.oracle,
      direction: data.direction,
      reinvest: data.reinvest,
      rate,
      duration,
      percent,
    };
    this.logger.debug('Order data', { description, amount })
    const method = this.core.methods.createOrder(this.sender, description, amount);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.debug('Tx sent', { tx: tx.transactionHash });
    const event = tx.events!.OrderCreated as Core.Web3.OrderCreated;
    const orderId = Number(event.returnValues.orderId);
    const txHash = tx.transactionHash;
    this.logger.log('Order created', { orderId, txHash });
    this.#notify((api) => api.orders.orderControllerCreateOrder({ txHash }));
    return { orderId, txHash };
  }

  async increaseOrderAmount(orderId: OrderId, oAmount: number) {
    const amount = await this.#parseStableAmount(oAmount);
    await this.#approve(amount);
    const method = this.core.methods.increaseOrder(orderId, amount);
    const tx = await this.gasStation.estimateAndSend(method);
    const txHash = tx.transactionHash;
    this.#notify((api) => api.orders.orderControllerIncreaseOrder({ txHash }));
    this.logger.log('Order created', { tx: tx.transactionHash });
  }

  async decreaseOrderAmount(orderId: OrderId, amount: number) {
    const actualAmount = await this.#parseStableAmount(amount);
    const method = this.core.methods.withdrawOrder(orderId, actualAmount);
    const tx = await this.gasStation.estimateAndSend(method);
    const txHash = tx.transactionHash;
    this.#notify((api) => api.orders.orderControllerWithdrawOrder({ txHash }));
    this.logger.log('Order wihtdrawed', { txHash });
  }

  async closeOrder(orderId: OrderId) {
    const order = await this.core.methods.orders(orderId).call();
    assert(order.closed === false, 'Order is already cancelled');
    const method = this.core.methods.closeOrder(orderId);
    const tx = await this.gasStation.estimateAndSend(method);
    const txHash = tx.transactionHash;
    this.#notify((api) => api.orders.orderControllerCloseOrder({ txHash }));
    this.logger.log('Order closed', { txHash });
  }

  async acceptOrders(oParams: { orderId: OrderId, amount: number }[]) {
    const decimals = await this.stableDecimals;
    const orders = oParams.map((item) => {
      return {
        orderId: item.orderId,
        amount: this.#parseFloat(item.amount, decimals),
      }
    });
    const totalAmount = oParams.reduce((sum, order) => sum.add(order.amount), Big(0)).toString();
    await this.#approve(totalAmount);
    const method = this.core.methods.accept(this.sender, orders);
    const tx = await this.gasStation.estimateAndSend(method);
    const txHash = tx.transactionHash;
    this.#notify((api) => api.positions.positionControllerCreatePositionByHash({ txHash }));
    this.logger.log('Order accepted', { txHash });
  }

  async getOraclePythId(oracleAddress: string) {
    const contract = new PythCryptoOracle.Contract(this.web3, oracleAddress);
    const pythId = await contract.methods.priceId().call();
    return pythId
  }

  async approve(amount: number) {
    const value = await this.#parseStableAmount(amount);
    await this.#approve(value);
  }

  async #approve(amount: string | number) {
    const allowance = await this.stable.methods.allowance(this.sender, this.core.options.address).call().then((v) => Big(v));
    if (allowance.lt(amount)) {
      this.logger.debug('Too low allowance, reapproving..', { current: allowance, needed: amount });
      const method = this.stable.methods.approve(this.core.options.address, amount.toString());
      const tx = await this.gasStation.estimateAndSend(method);
      this.logger.debug('Approved', { tx: tx.transactionHash });
    }
  }

  #parsePercent(oValue: AllowedPercentValue) {
    assert(AllowedPercentValues.includes(oValue), `Invalid percent value. Valid values: ${AllowedPercentValues.join(',')}`);
    let value: Big;
    switch (oValue) {
      case 'UP':
        value = Big(100);
        break;
      case 'DOWN':
        value = Big(0);
        break;
      default:
        value = Big(oValue);
        break;
    }
    const a = value.times(1e2).add(1e4);
    return a.times(1e14).toString();
  }

  #parseDuration(value: AllowedDurationValue) {
    assert(AllowedDurationValues.includes(value), `Invalid duration. Valid values: ${AllowedDurationValues.join(',')}`);
    return DurationMap[value];
  }

  async #parseRate(oValue: number) {
    const RateDecimals = 18;
    const value = applyDecimals(Big(oValue).sub(1), RateDecimals);
    const { minOrderRate, maxOrderRate } = await this.limitsConfiguration;
    const formatedMin = removeDecimals(minOrderRate, RateDecimals);
    const formatedMax = removeDecimals(maxOrderRate, RateDecimals);
    assert(value.gte(minOrderRate) && value.lte(maxOrderRate), `Invalid rate: rate (${oValue}) should be >= ${formatedMin} and <= ${formatedMax}`);
    return value.toString();
  }

  async #validateOrderAmount(amount: Big, rate: Big) {
    const minAmount = await this.getMinOrderAmount(rate);
    const stableDecimals = await this.stableDecimals;
    const fAmount = removeDecimals(amount, stableDecimals);
    const fMinAmount = removeDecimals(minAmount, stableDecimals);
    assert(amount.gte(minAmount), `Invalid order amount: amount (${fAmount}) should be greater than minAmount (${fMinAmount}) (minAmount depends on rate)`);
  }

  #parseFloat(value: number, decimals: number) {
    const result = applyDecimals(value, decimals);
    const fract = result.round(Big.roundDown).minus(result);
    assert(fract.lte(0), `Invlalid float, too many numbers in fractional part (value=${value} maxFractionalNumbersCount=${decimals}`)
    return result.toString()
  }

  async #parseStableAmount(value: number) {
    return this.#parseFloat(value, await this.stableDecimals);
  }

  #notify(fn: (rawApi: IRawApi) => Promise<unknown>) {
    if (!this.rawApi) {
      this.logger.debug('Notifications are disabled (bc rawApi is not set)')
    } else {
      this.logger.debug('Notifaction sent');
      fn(this.rawApi)
        .catch((error) => {
          this.logger.warn('Failed to notify, wait for backend to index your action', error);
        })
    }
  }

  async getMinOrderAmount(rate: Big | number | string) {
    const [{ protocolFee }, { minKeeperFee }] = await Promise.all([
      this.feeConfiguration,
      this.limitsConfiguration,
    ]);
    const currentRate = Big(rate);
    const divider = Big(PRECISION);
    let denominatorMinuend = divider.times(divider);
    let numerator = Big(minKeeperFee).times(denominatorMinuend);
    let denominatorSubtrahend = Big(protocolFee).times(currentRate.plus(1));
    if (currentRate.lt(divider)) {
      numerator = numerator.times(divider);
      denominatorMinuend = denominatorMinuend.times(rate);
      denominatorSubtrahend = denominatorSubtrahend.times(divider);
    }
    return numerator.div(denominatorMinuend.minus(denominatorSubtrahend)).plus(1);
  }
}
