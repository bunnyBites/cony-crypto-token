import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";

actor Token {
  // get the principal
  let owner : Principal = Principal.fromText("6gvts-tp6a2-idw55-4dc5l-cngoo-r23zu-7rkag-za5dv-oqzel-66mfw-lqe");

  // total balance in the account
  let balance : Nat = 1000000000;

  // our crypto token name
  let symbol = "CONY";

  // store the balance of each user (mapped with their principal id)
  let balances = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);

  if (balances.size() == 0) { balances.put(owner, balance); };

  public query func getBalance(principalId : Text) : async Nat {
    let preparedPrincipal = Principal.fromText(principalId);

    return switch (balances.get(preparedPrincipal)) {
      case null 0;
      case (?result) result;
    };
  };

  public query func getSymbol(): async Text {
    return symbol;
  };

  public shared(message) func claimTokens(): async Text {
    let caller = message.caller;

    if (balances.get(caller) == null) {
      return await transfer(Principal.toText(caller), 10000);
    };

    return "Already Claimed!!";
  };

  public shared(message) func transfer(toPrincipalId: Text, amountToBeTransfered: Nat): async Text {
    Debug.print(debug_show(message.caller));

    let preparedToPrincipal = Principal.fromText(toPrincipalId);
    let balanceOfTheSender = await getBalance(Principal.toText(message.caller));

    if (toPrincipalId == Principal.toText(message.caller)) {
      return "Sender and Reciever are same!!";
    };

    if (balanceOfTheSender > amountToBeTransfered) {
      // update the sender balance
      balances.put(message.caller, (balanceOfTheSender - amountToBeTransfered));

      // update the reciever balance
      let balanceOfTheReciever = await getBalance(toPrincipalId);
      balances.put(preparedToPrincipal, (balanceOfTheReciever + amountToBeTransfered));

      return "Success";
    };

    return "Insufficient balance";
  }
};
