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
    url: 'https://xc-mainnet.pyth.network',
  }
})

async function main() {

  const [oracle] = await sdk.api.getOracles();

  const oraclePythId = await sdk.priceFeed.getOraclePythId(oracle.address);
  console.log(`Oracle pyth id for ${oracle.name} (address=${oracle.address})`, oraclePythId)
  const latest = await sdk.priceFeed.pyth.getLatestPriceFeeds([oraclePythId]);
  console.log('Latest Price Feeds', latest);
  sdk.priceFeed.pyth.subscribePriceFeedUpdates([oraclePythId], (priceFeed) => {
    const price = priceFeed.getPriceUnchecked();
    const formattedPrice = sdk.utils.applyDecimals(price.price, price.expo).toString();
    console.log(`[${new Date().toISOString()}] New price feed received`, formattedPrice, priceFeed);
  })

}

main();
