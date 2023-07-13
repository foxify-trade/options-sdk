import Web3 from 'web3';
import AbiCoder from 'web3-eth-abi';
import { Log } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { ContractEventLog } from './types';

export function compareAddress(actual: string, expected: string): boolean {
  return actual.toLowerCase() === expected.toLowerCase();
}

export type ObtainLog<T> = T extends ContractEventLog<infer U> ? U : never;

export function decodeLog<T extends ContractEventLog<any>>(abi: AbiItem, log: Log, web3?: Web3) {
  if (abi.type !== 'event') {
    throw new Error(`${decodeLog.name}: abi.type must be "event"`);
  }
  if (!abi.inputs) {
    throw new Error(`${decodeLog.name}: abi.inputs is empty`);
  }
  const coder = web3 ? web3.eth.abi : AbiCoder;
  const [topic0, ...topics] = log.topics;
  const signature = coder.encodeEventSignature(abi);
  if (topic0 !== signature) {
    throw new Error(`${decodeLog.name}: topic0 is not equal to abi signature`);
  }
  const result = coder.decodeLog(
    abi.inputs,
    log.data,
    topics,
  );
  return result as ObtainLog<T>;
}

export interface ObtainLogOpts {
  abi: AbiItem;
  address?: string;
}
export function obtainLog<T extends ContractEventLog<any>>(logs: Log[], opts: ObtainLogOpts): undefined | Log & { result: ObtainLog<T> } {
  const topic0 = AbiCoder.encodeEventSignature(opts.abi);
  const log = logs.find((log) => {
    if (opts.address && !compareAddress(log.address, opts.address)) {
      return false;
    }
    if (log.topics[0] !== topic0) {
      return false;
    }
    return true;
  });

  if (!log) {
    return;
  }

  const data = decodeLog<T>(opts.abi, log);
  return {
    ...log,
    result: data,
  };

}
