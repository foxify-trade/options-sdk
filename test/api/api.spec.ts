
import { OptionsApi } from '../../src/api';

const url = 'https://api-options.prd.foxify.trade';
describe('API SDK tests', () => {

  it('construct', () => {
    new OptionsApi({
      url: '',
    });
  });

  describe('Oracles', () => {
    let sdk: OptionsApi;

    beforeEach(() => {
      sdk = new OptionsApi({
        url,
      });
    });

    it('get', async () => {
      const result = await sdk.getOracles();
    });

  });

  describe('Orders', () => {
    let sdk: OptionsApi;

    beforeEach(() => {
      sdk = new OptionsApi({
        url,
      });
    });

    it('get', async () => {
      const result = await sdk.getOrders();
    });

  });
});
