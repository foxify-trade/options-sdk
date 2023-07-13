import Web3 from 'web3';
import { ContractOptions } from 'web3-eth-contract';
import { FactoryProvider, mixin } from '@nestjs/common';
import { AbiItem } from 'web3-utils';
import { BaseContract, ContractEventLog } from './types';

interface IOpts {
  abi: AbiItem[];
}

export interface IAt<T> {
  At(web3: Web3, address: string): T;
}

export interface ContractCtor<T> {
  new(web3: Web3, address: string, options?: ContractOptions): T;
}

export function Web3Contract<T extends Omit<BaseContract, 'constructor'>>(opts: IOpts): ContractCtor<T> {
  class Web3Contract {
    constructor(web3: Web3, address: string, options?: ContractOptions) {
      // const contract = new Contract(opts.abi, address);
      // //@ts-ignore
      // contract.setProvider(web3.currentProvider);
      // return contract as unknown as T;
      return new web3.eth.Contract(opts.abi, address, options);
    }
  }
  return Web3Contract as unknown as ContractCtor<T>;
}

export type EventFactory<
  TName extends string,
  TMap extends Record<TName, any>,
  TEvent extends TName | void = void,
> = TEvent extends TName ? TMap[TEvent] : TMap[TName];

export function EventAbiFactory<T extends string>(fullAbi: AbiItem[], nameMap: Record<string, T>, type: AbiItem['type'] = 'event') {

  const names = Object.values<string>(nameMap);
  const result = names.reduce((acc, name) => {
    const abi = fullAbi.find((abi) => abi.type === type && abi.name === name);
    if (!abi) {
      throw new Error(`${EventAbiFactory.name}: Abi not found for ${type} ${name}`);
    }
    acc[name as T] = abi;
    return acc;
  }, {} as Record<T, AbiItem>);
  return result;
}

