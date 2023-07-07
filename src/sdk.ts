import { OptionsApi, OptionsApiCtorParams } from './api/api';
import { OptionContracts, OptionsContractsCtorParams } from './contracts/options-contract';

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
