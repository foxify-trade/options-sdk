import { OptionsApi, OptionsApiCtorParams } from './api/api.module';
import { OptionContracts, OptionsContractsCtorParams } from './contracts/contracts.module';
import { OptionsPriceFeed, OptionsPriceFeedParams } from './price-feed';
import * as decimalsUtils from './utils/decimals.utils';

export interface OptionsSdkParams {
  api: OptionsApiCtorParams;
  contracts: OptionsContractsCtorParams;
  priceFeed: OptionsPriceFeedParams;
}

const Utils = {
  ...decimalsUtils,
}

export class OptionsSdk {
  api: OptionsApi;
  contracts: OptionContracts;
  priceFeed: OptionsPriceFeed;
  utils = Utils;

  constructor(params: OptionsSdkParams) {
    this.api = new OptionsApi(params.api);
    this.contracts = new OptionContracts({
      rawApi: this.api.raw,
      ...params.contracts,
    });
    this.priceFeed = new OptionsPriceFeed({
      contracts: this.contracts,
      ...params.priceFeed,
    })
  }

  static Utils = Utils;

}
