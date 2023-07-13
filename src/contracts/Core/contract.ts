import { ABI } from './abi';
import { EventAbiFactory, Web3Contract } from '../factory';
import * as Base from './web3';

export class Contract extends Web3Contract<Base.Core>({
  abi: ABI,
}) { }

export enum EventName {
  // Accepted = 'Accepted',
  // AutoResolved = 'AutoResolved',
  OrderCreated = 'OrderCreated',
  // OrderClosed = 'OrderClosed',
  // OrderIncreased = 'OrderIncreased',
  // OrderWithdrawal = 'OrderWithdrawal',
}

export const EventAbi = EventAbiFactory(ABI, EventName);

