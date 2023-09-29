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

interface IGetOrders {
  oracleIds?: Array<number>;
  sortingBy?: 'rate' | 'reserved' | 'available' | 'duration' | 'percent' | 'amount';
  sortingDestination?: 'ASC' | 'DESC';
  closed?: boolean;
  account?: string;
  orderType?: 'my_order' | 'all_order';
  duration?: string;
  percent?: string;
  skip?: number;
  limit?: number
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

  async getOrders(oParams?: IGetOrders) {
    const paramsObj: IGetOrders = {
      oracleIds: oParams?.oracleIds,
      sortingBy: oParams?.sortingBy,
      sortingDestination: oParams?.sortingDestination,
      closed: oParams?.closed,
      account: oParams?.account,
      orderType: oParams?.orderType,
      duration: oParams?.duration,
      percent: oParams?.percent,
      skip: oParams?.skip,
      limit: oParams?.limit,
    };
    const params = Object.values(paramsObj) as Parameters<OrdersApi['orderControllerGetOrders']>;
    const response = await this.raw.orders.orderControllerGetOrders(...params);
    return response.data;
  }

  async getOrder(orderId: number) {
    const response = await this.raw.orders.orderControllerGetOrder(orderId);
    return response.data;
  }
}
