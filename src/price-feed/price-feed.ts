import * as Pyth from '@pythnetwork/pyth-evm-js';
import { OptionContracts } from '../contracts';

export interface OptionsPriceFeedParams {
  url: string;
  contracts?: OptionContracts;
}

export class OptionsPriceFeed {
  pyth: Pyth.EvmPriceServiceConnection;
  contracts?: OptionContracts;

  constructor(params: OptionsPriceFeedParams) {
    this.pyth = new Pyth.EvmPriceServiceConnection(params.url);
    this.contracts = params.contracts;
  }

  async fullfilOracleWithPythId<T extends { address: string }>(oracle: T): Promise<T & { pythId: string; }> {
    const pythId = await this.getOraclePythId(oracle.address);
    return { ...oracle, pythId };
  }

  async getPriceByOracleAddress(oracleAddress: string) {
    const pythId = await this.getOraclePythId(oracleAddress);
    this.getPrice(pythId);
  }


  getPrice(oraclePythId: string) {
    this.pyth.getLatestPriceFeeds([oraclePythId]);
  }

  #cache = new Map<string, string>();
  async getOraclePythId(oracleAddress: string) {
    if (this.#cache.has(oracleAddress)) {
      return this.#cache.get(oracleAddress)!;
    }
    if (!this.contracts) {
      throw new Error('Unable to determine oracle pythId (bc contracts is not set in PriceFeed');
    }
    const pythId = await this.contracts.getOraclePythId(oracleAddress);
    this.#cache.set(oracleAddress, pythId);
    return pythId;
  }

}
