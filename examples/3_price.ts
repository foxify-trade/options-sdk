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
  },
  priceFeed: {
    url: 'https://hermes.pyth.network',
  }
})

async function main() {

  const [oracle] = await sdk.api.getOracles();

  console.log(`Oracle pyth id for ${oracle.name} (address=${oracle.address})`)
  const latest = await sdk.priceFeed.getLatestPrice(oracle.address);
  await sdk.api.raw.orders.orderControllerGetOrders().
    console.log('Latest Price Feeds', latest);
  sdk.priceFeed.subscribePriceUpdates(oracle.address, (price) => {
    console.log(`[${new Date().toISOString()}] New price feed received`, price);
  })

}

main();
