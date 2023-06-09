import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'claimTokens' : () => Promise<string>,
  'getBalance' : (arg_0: string) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
  'transfer' : (arg_0: string, arg_1: bigint) => Promise<string>,
}
