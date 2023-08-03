import { OptionsApi, OptionsApiCtorParams } from './api/api.module';
import { OptionContracts, OptionsContractsCtorParams } from './contracts/contracts.module';

export interface OptionsSdkParams {
  api: OptionsApiCtorParams;
  contracts: OptionsContractsCtorParams;
}

export class OptionsSdk {
  api: OptionsApi;
  contracts: OptionContracts;

  constructor(params: OptionsSdkParams) {
    this.api = new OptionsApi(params.api);
    this.contracts = new OptionContracts(params.contracts);
  }

}
