export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'claimTokens' : IDL.Func([], [IDL.Text], []),
    'getBalance' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'getSymbol' : IDL.Func([], [IDL.Text], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
