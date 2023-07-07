import { Configuration, OraclesApi, OrdersApi } from './generated';

export interface OptionsApiCtorParams {
  url: string;
  token?: string;
}

export class OptionsApi {
  protected oraclesApi: OraclesApi;
  protected ordersApi: OrdersApi;

  constructor(params: OptionsApiCtorParams) {
    const apiConfig = new Configuration({
      basePath: params.url,
    });
    this.oraclesApi = new OraclesApi(apiConfig);
    this.ordersApi = new OrdersApi(apiConfig);
  }

  getOracles() {
    return this.oraclesApi.oracleControllerGetOracles();
  }

  async getOrders() {
    const response = await this.ordersApi.orderControllerGetOrders();
    return response.data;
  }

}
