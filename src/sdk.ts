import { OptionsApi, OptionsApiCtorParams } from './api/api.module';
import { OptionContracts, OptionsContractsCtorParams } from './contracts/contracts.module';
import { OptionsPriceFeed, OptionsPriceFeedCtorParams } from './price-feed';
import * as decimalsUtils from './utils/decimals.utils';
import { PartialObject } from './utils/type.utils';
import { EvmPriceServiceConnection } from '@pythnetwork/pyth-evm-js';


const DefaultApiParams: OptionsApiCtorParams = {
  url: 'https://api-options.prd.foxify.trade',
}

const DefaultContractsParams: Omit<OptionsContractsCtorParams, 'privateKey'> = {
  rpc: 'https://arbitrum-one.publicnode.com',
  pythUrl: 'https://xc-mainnet.pyth.network',
  address: {
    core: '0xec301D5a4ee80DF21E243E5490d29d44B83c27fC',
    stable: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    coreConfiguration: '0x9fdfa1eefab11a0eb7f70ae74f526d8e8b30dff4',
  },
  gasRiskFactor: {
    price: 10n,
    limit: 10n,
  },
} as const;

const DefaultPriceFeedParams: OptionsPriceFeedCtorParams = {
  url: 'https://xc-mainnet.pyth.network',
}

export interface OptionsSdkParams {
  api?: OptionsApiCtorParams;
  contracts: PartialObject<OptionsContractsCtorParams, keyof typeof DefaultContractsParams>;
  priceFeed?: OptionsPriceFeedCtorParams;
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
    this.api = new OptionsApi({
      ...DefaultApiParams,
      ...params.api
    });
    this.contracts = new OptionContracts({
      rawApi: this.api.raw,
      ...DefaultContractsParams,
      ...params.contracts,
    });
    this.priceFeed = new OptionsPriceFeed({
      contracts: this.contracts,
      ...DefaultPriceFeedParams,
      ...params.priceFeed,
    })
  }

  static Utils = Utils;

}
