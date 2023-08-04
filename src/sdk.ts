import { OptionsApi, OptionsApiCtorParams } from './api/api.module';
import { OptionContracts, OptionsContractsCtorParams } from './contracts/contracts.module';
import { OptionsPriceFeed, OptionsPriceFeedParams } from './price-feed';

export interface OptionsSdkParams {
  api: OptionsApiCtorParams;
  contracts: OptionsContractsCtorParams;
  priceFeed: OptionsPriceFeedParams;
}

export class OptionsSdk {
  api: OptionsApi;
  contracts: OptionContracts;
  priceFeed: OptionsPriceFeed;

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

}
