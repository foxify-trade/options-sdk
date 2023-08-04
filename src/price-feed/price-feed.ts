import * as Pyth from '@pythnetwork/pyth-evm-js';
import { OptionContracts } from '../contracts';
import { applyDecimals } from '../utils/decimals.utils';

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

  async subscribePriceUpdates(oracleAddress: string, cb: (price: number) => unknown) {
    const pythId = await this.getOraclePythId(oracleAddress);
    this.pyth.subscribePriceFeedUpdates([pythId], (priceFeed) => {
      const price = this.#formatPrice(priceFeed);
      cb(price)
    });
  }

  async getLatestPrice(oracleAddress: string) {
    const pythId = await this.getOraclePythId(oracleAddress);
    const result = await this.pyth.getLatestPriceFeeds([pythId]);
    if (result) {
      return this.#formatPrice(result[0]);
    }
  }

  #formatPrice(priceFeed: Pyth.PriceFeed) {
    const { price, expo } = priceFeed.getPriceUnchecked();
    const formattedPrice = applyDecimals(price, expo).toString();
    return Number(formattedPrice);
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
