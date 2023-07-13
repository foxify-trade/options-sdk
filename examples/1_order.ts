import assert from 'assert';
import { OptionsSdk } from '../src/sdk';
require('dotenv').config();
// import { OptionsSdk } from '@foxify/options-sdk';


assert(process.env.PK, 'Set PK in .env');

const sdk = new OptionsSdk({
  api: {
    url: 'https://api-options.prd.foxify.trade',
  },
  contracts: {
    rpc: 'https://arbitrum-one.publicnode.com',
    privateKey: process.env.PK,
    address: {
      core: '0xec301D5a4ee80DF21E243E5490d29d44B83c27fC',
      stable: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
    },
    gasRiskFactor: {
      price: 10n,
      limit: 10n,
    }
  }
})

const minStableAmount = 10;
async function main() {

  const [order] = await sdk.api.getOrders();
  console.log('order', order);

  console.log('params', sdk.contracts.sender, [{
    orderId: order.id,
    amount: order.amount,
  }])
  const result = await sdk.contracts.acceptOrders(sdk.contracts.sender, [{
    orderId: order.orderId,
    amount: minStableAmount + 1,
  }]);
  console.log("🚀 ~ file: 1_order.ts:22 ~ main ~ result:", result)
}

main();
