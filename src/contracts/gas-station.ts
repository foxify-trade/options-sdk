import Web3 from 'web3';
import { TransactionReceipt } from 'web3-core';

import { ILogger } from '../logger';
import { BaseContract, NonPayableTransactionObject, NonPayableTx, PayableTransactionObject, PayableTx } from './types';
import { TransactionConfig } from 'web3-core';

export interface IMethodPrivate {
  _parent: BaseContract;
}
export type IMethod = PayableTransactionObject<unknown> | NonPayableTransactionObject<unknown>;
export type IMethodFull = IMethodPrivate & IMethod;
export type IMethodOpts = PayableTx | NonPayableTx;

export interface IGasEstimation {
  gas: string;
  gasLimit: string;
  gasPrice: string;
  gasFee: string;
}

type TxConfParams = [TransactionConfig];
type MethodParams = [IMethod, IMethodOpts?];
type Params = TxConfParams | MethodParams;
interface MethodWrap {
  txConf: undefined;
  method: IMethod;
  opts?: IMethodOpts;
}

interface TxConfWrap {
  txConf: TransactionConfig;
  method: undefined;
  opts: undefined;
}

interface IOpts {
  web3: Web3;
  logger: ILogger;
  gasRiskFactor?: IGasRiskFactor;
}

interface IGasRiskFactor {
  gasPrice: bigint;
  gasLimit: bigint;
}

const DefaultGasRiskFactor: IGasRiskFactor = {
  gasPrice: 10n,
  gasLimit: 40n,
};
export class GasStation {
  private web3: Web3;
  private logger: ILogger;
  factor: IGasRiskFactor;

  // 0 means not change, 10 means that original value would be increased by oValue * 1.1

  constructor(params: IOpts) {
    this.web3 = params.web3;
    this.logger = params.logger;
    this.factor = params.gasRiskFactor ?? DefaultGasRiskFactor;
  }

  async rawEstimate(...params: Params) {
    this.web3.eth.handleRevert = true;
    const [rawLimit, rawPrice] = await Promise.all([this.safeGasEstimate(...params), this.web3.eth.getGasPrice()]);

    const limit = BigInt(rawLimit);
    const price = BigInt(rawPrice);
    const total = limit * price;

    return { limit, price, total };
  }

  async estimate(...params: Params): Promise<IGasEstimation> {
    this.web3.eth.handleRevert = true;
    const [rawLimit, rawPrice, block] = await Promise.all([
      this.safeGasEstimate(...params),
      this.web3.eth.getGasPrice(),
      this.web3.eth.getBlock('latest'),
    ]);

    const price = this.applyRisk(rawPrice, this.factor.gasPrice);
    const blockLimit = this.applyRisk(block.gasLimit, -5n);
    const limit = this.applyRisk(rawLimit, this.factor.gasLimit, blockLimit);
    const total = limit * price;

    const result = {
      gas: limit.toString(),
      gasLimit: limit.toString(),
      gasPrice: price.toString(),
      gasFee: total.toString(),
    };

    this.logger.debug('Gas estimated', {
      ...result,
    });

    return result;
  }

  async estimateAndSend(...params: Params): Promise<TransactionReceipt> {
    const { txConf, method, opts } = this.wrap(params);
    const oGasOpts = await this.estimate(...params);
    const toHex = (v: string) => '0x' + Number(v).toString(16);
    const gasOpts = {
      gas: toHex(oGasOpts.gas),
      gasPrice: toHex(oGasOpts.gasPrice)
    };
    if (method) {
      return this.send(method, { ...opts, ...gasOpts });
      // return method.send({ ...opts, ...gasOpts });
    } else {
      return this.send({ ...txConf, ...gasOpts });
      // return this.web3.eth.sendTransaction(txConf!);
    }
  }

  async send(...params: Params): Promise<TransactionReceipt> {
    const { txConf, method, opts } = this.wrap(params);
    if (method) {
      return method.send({ ...opts });
    } else {
      return this.web3.eth.sendTransaction(txConf!);
    }
    // return { transactionHash: 'heylaley' } as any;
  }

  async safeGasEstimate(...params: Params): Promise<number> {
    try {
      const { method, opts, txConf } = this.wrap(params);
      if (method) {
        const limit = await method.estimateGas(opts);
        return limit;
      } else {
        const limit = await this.web3.eth.estimateGas(txConf!);
        return limit;
      }
    } catch (error) {
      // this.logger.error('Gas estimation failure', error);
      throw new Error('Gas estimation failed', { cause: error });
    }
  }

  applyRisk(oValue: number | string | bigint, risk: bigint, max?: bigint): bigint {
    const value = BigInt(oValue);
    if (max && value > max) {
      throw new Error('Gas station: estimated gas is greater than max');
    }
    const result = BigInt(oValue) * (100n + risk) / 100n;
    if (max && result > max) {
      this.logger.warn('Risked value is greater than max', { risk, value, max, result });
      return max;
    }
    return result;
  }

  private wrap(params: TxConfParams | MethodParams): MethodWrap | TxConfWrap {
    const txConfOrMethod = params[0];
    const isMethod = 'estimateGas' in txConfOrMethod;

    if (isMethod) {
      return {
        txConf: undefined,
        method: txConfOrMethod as IMethod,
        opts: params[1],
      };
    } else {
      return {
        txConf: txConfOrMethod as TransactionConfig,
        method: undefined,
        opts: undefined,
      };
    }
  }
}
