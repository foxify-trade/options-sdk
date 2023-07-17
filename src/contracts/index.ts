import assert from 'assert';
import Web3 from 'web3';
import { Core } from './Core';
import { CoreConfiguration } from './CoreConfiguration';
import { Erc20 } from './Erc20';
import { ILogger } from '../logger';
import { GasStation } from './gas-station';
import { obtainLog } from './log.utils';

enum Direction {
  Up,
  Down,
}
const AllowedPercentValues = [5, 3, 1, 0.5, 0.25, 0.1, -0.1, -0.25, -0.5, -1, -3, -5] as const;
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
  rate: number | string;
  /**
   * Number multiplied by stable decimals (8 for default)
   * @example 1=1e8 10=10 * 1e8=1e9
   */
  amount: number | string;
}

export interface OptionsContractsCtorParams {
  rpc: string;
  logger?: ILogger;
  privateKey: string;
  address: {
    core: string;
    stable: string;
  };
  gasRiskFactor: {
    price: BigInt,
    limit: BigInt,
  }
}

export class OptionContracts {
  protected web3: Web3;
  protected logger: ILogger;

  sender: string;
  gasStation: GasStation;

  core: Core.Contract;
  stable: Erc20.Contract;

  Direction = Direction;

  constructor(params: OptionsContractsCtorParams) {
    this.logger = params.logger ?? console;

    this.web3 = new Web3(params.rpc);
    this.gasStation = new GasStation({ logger: this.logger, web3: this.web3 });

    const account = this.web3.eth.accounts.wallet.add(params.privateKey);
    this.sender = account.address;

    const contractOptions = { from: this.sender };
    this.core = new Core.Contract(this.web3, params.address.core, contractOptions);
    this.stable = new Erc20.Contract(this.web3, params.address.stable, contractOptions);
  }

  async increaseOrder(...params: Parameters<Core.Contract['methods']['increaseOrder']>) {
    const [, amount] = params;
    await this.#approve(amount.toString());
    const method = this.core.methods.increaseOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order created', { tx: tx.transactionHash });
  }

  async createOrder(
    data: ICreateOrder
  ) {
    assert(AllowedDurationValues.includes(data.duration), `Invalid duration. Valid values: ${AllowedDurationValues.join(',')}`);
    assert(AllowedPercentValues.includes(data.percent), `Invalid percent. Valid values: ${AllowedPercentValues.join(',')}`);
    await this.#approve(data.amount);
    const percent = (100n + BigInt(data.percent)) * BigInt(1e16);
    const description: Core.Web3.ICore.OrderDescriptionStruct = {
      oracle: data.oracle,
      direction: data.direction,
      reinvest: data.reinvest,
      rate: data.rate.toString(),
      duration: DurationMap[data.duration],
      percent: percent.toString(),
    };
    const method = this.core.methods.createOrder(this.sender, description, data.amount);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.debug('Tx sent', { tx: tx.transactionHash });
    const event = tx.events!.OrderCreated as Core.Web3.OrderCreated;
    const orderId = event.returnValues.orderId;
    this.logger.log('Order created', { orderId: orderId });
    return { orderId, txHash: tx.transactionHash };
  }

  async withdrawOrder(...params: Parameters<Core.Contract['methods']['withdrawOrder']>) {
    const method = this.core.methods.withdrawOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order wihtdrawed', { tx: tx.transactionHash });
  }

  async closeOrder(...params: Parameters<Core.Contract['methods']['closeOrder']>) {
    const method = this.core.methods.closeOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order closed', { tx: tx.transactionHash });
  }

  async acceptOrders(...params: Parameters<Core.Contract['methods']['accept']>) {
    const [, orders] = params;
    const totalAmount = orders.reduce((sum, order) => {
      const amount = Array.isArray(order) ? order[1] : order.amount;
      return sum + BigInt(amount.toString());
    }, 0n);
    await this.#approve(totalAmount);
    const method = this.core.methods.accept(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order accepted', {
      tx: tx.transactionHash,
    });
  }

  async #approve(oAmount: bigint | string | number) {
    const amount = BigInt(oAmount);
    const allowance = await this.stable.methods.allowance(this.sender, this.core.options.address).call().then((v) => BigInt(v));
    if (allowance < amount) {
      this.logger.debug('Too low allowance, reapproving..', { current: allowance, needed: amount });
      const method = this.stable.methods.approve(this.core.options.address, amount.toString());
      const tx = await this.gasStation.estimateAndSend(method);
      this.logger.debug('Approved', { tx: tx.transactionHash });
    }
  }

}
