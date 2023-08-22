import assert from 'assert';
import { OptionsSdk } from '../src/sdk';
require('dotenv').config();
// import { OptionsSdk } from '@foxify/options-sdk';


assert(process.env.PK, 'Set PK in .env');

const sdk = new OptionsSdk({
  contracts: {
    privateKey: process.env.PK,
  }
});

async function main() {

  // get orders that u have created
  const orders = await sdk.api.getOrders({
    account: sdk.contracts.sender,
    skip: 0,
    limit: 100,
  });
  const order = orders.find((order) => BigInt(order.available) > 0n);
  assert(order, 'No order found (available > 0)');
  await sdk.contracts.acceptOrders([{
    orderId: order.orderId,
    amount: 3,
  }])
}

main();
