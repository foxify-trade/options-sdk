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

  const [oracle] = await sdk.api.getOracles();

  const { orderId } = await sdk.contracts.createOrder({
    direction: sdk.contracts.Direction.Up,
    duration: '15m',
    oracle: oracle.address,
    percent: 5,
    rate: 1e16.toString(),
    reinvest: false,
    amount: 100,
  });

  await sdk.contracts.increaseOrder(orderId, 10);
  await sdk.contracts.withdrawOrder(orderId, 10);
  await sdk.contracts.closeOrder(orderId);

}

main();
