import { ABI } from './abi';
import { Web3Contract } from '../factory';
import * as Base from './web3';

export class Contract extends Web3Contract<Base.Oracle>({
  abi: ABI,
}) { }

// export enum EventName {
//   OraclesAdded = 'OraclesAdded',
//   OraclesRemoved = 'OraclesRemoved',
// }

// export const EventAbi = EventAbiFactory(ABI, EventName);

