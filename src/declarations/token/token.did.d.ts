import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'getBalance' : (arg_0: string) => Promise<bigint>,
  'getSymbol' : () => Promise<string>,
}
