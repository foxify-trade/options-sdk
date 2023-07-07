import Web3 from 'web3';
import { Core } from './Core';
import { CoreConfiguration } from './CoreConfiguration';
import { Erc20 } from './Erc20';
import { ILogger } from '../logger';
import { GasStation } from './gas-station';


export interface OptionsContractsCtorParams {
  rpc: string;
  logger?: ILogger;
  privateKey: string;
  address: {
    core: string;
    stable: string;
  }
}

export class OptionContracts {
  protected web3: Web3;
  protected logger: ILogger;

  sender: string;
  gasStation: GasStation;

  core: Core.Contract;
  stable: Erc20.Contract;

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

  async createOrder(...params: Parameters<Core.Contract['methods']['createOrder']>) {
    const method = this.core.methods.createOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order created', { tx: tx.transactionHash });
  }

  async withdrawOrder(...params: Parameters<Core.Contract['methods']['withdrawOrder']>) {
    const method = this.core.methods.withdrawOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order created', { tx: tx.transactionHash });
  }

  async closeOrder(...params: Parameters<Core.Contract['methods']['closeOrder']>) {
    const method = this.core.methods.closeOrder(...params);
    const tx = await this.gasStation.estimateAndSend(method);
    this.logger.log('Order created', { tx: tx.transactionHash });
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
    const allowance = await this.stable.methods.allowance(this.core.options.address, this.sender).call().then(BigInt);
    if (allowance < amount) {
      this.logger.debug('Too low allowance, reapproving..', { current: allowance, needed: amount });
      const method = this.stable.methods.approve(this.core.options.address, amount.toString());
      const tx = await this.gasStation.estimateAndSend(method);
      this.logger.debug('Approved', { tx: tx.transactionHash });
    }
  }

}
