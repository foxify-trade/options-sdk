import { OptionsSdk } from '../src/sdk';

const sdk = new OptionsSdk({
  api: {
    url: 'https://api-options.prd.foxify.trade',
  },
  contracts: {
    rpc: 'https://arbitrum-one.publicnode.com',
    privateKey: '7a277c8ed81c76c81a9f801f40f1b69be9aa80d0ecc71349a9df578801ad37fe',
    address: {
      core: '0xF3713169355ce882A6148Ea07e6B667D075640d2',
      stable: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
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
