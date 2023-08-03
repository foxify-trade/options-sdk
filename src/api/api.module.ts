import { Configuration, DefaultApi, ExternalApi, OraclesApi, OrdersApi, PositionsApi, TeamApi, WalletApi } from './generated';

export interface OptionsApiCtorParams {
  url: string;
  token?: string;
}

export interface IRawApi {
  default: DefaultApi;
  external: ExternalApi;
  oracles: OraclesApi;
  orders: OrdersApi;
  positions: PositionsApi;
  team: TeamApi;
  wallet: WalletApi;
}

export class OptionsApi {
  raw: IRawApi;

  constructor(params: OptionsApiCtorParams) {
    const apiConfig = new Configuration({
      basePath: params.url,
    });
    this.raw = {
      default: new DefaultApi(apiConfig),
      external: new ExternalApi(apiConfig),
      oracles: new OraclesApi(apiConfig),
      orders: new OrdersApi(apiConfig),
      positions: new PositionsApi(apiConfig),
      team: new TeamApi(apiConfig),
      wallet: new WalletApi(apiConfig),
    };
  }



  async getOracles() {
    const response = await this.raw.oracles.oracleControllerGetOracles();
    return response.data;
  }

  async getOrders() {
    const response = await this.raw.orders.orderControllerGetOrders();
    return response.data;
  }

}
