import Principal "mo:base/Principal";
import HashMap "mo:base/HashMap";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";

actor Token {
  // get the principal
  let owner : Principal = Principal.fromText("6gvts-tp6a2-idw55-4dc5l-cngoo-r23zu-7rkag-za5dv-oqzel-66mfw-lqe");

  // total balance in the account
  let balance : Nat = 1000000000;

  // our crypto token name
  let symbol = "CONY";

  private stable var balanceArr : [(Principal, Nat)] = [];

  // store the balance of each user (mapped with their principal id)
  let balanceHash = HashMap.fromIter<Principal, Nat>(balanceArr.vals(), 1, Principal.equal, Principal.hash);

  if (balanceHash.size() == 0) { balanceHash.put(owner, balance) };

  public query func getBalance(principalId : Text) : async Nat {
    let preparedPrincipal = Principal.fromText(principalId);

    return switch (balanceHash.get(preparedPrincipal)) {
      case null 0;
      case (?result) result;
    };
  };

  public query func getSymbol() : async Text {
    return symbol;
  };

  public shared (message) func claimTokens() : async Text {
    let caller = message.caller;

    if (balanceHash.get(caller) == null) {
      return await transfer(Principal.toText(caller), 10000);
    };

    return "Already Claimed!!";
  };

  public shared (message) func transfer(toPrincipalId : Text, amountToBeTransfered : Nat) : async Text {
    let preparedToPrincipal = Principal.fromText(toPrincipalId);
    let balanceOfTheSender = await getBalance(Principal.toText(message.caller));

    if (toPrincipalId == Principal.toText(message.caller)) {
      return "Sender and Reciever are same!!";
    };

    if (balanceOfTheSender > amountToBeTransfered) {
      // update the sender balance
      balanceHash.put(message.caller, (balanceOfTheSender - amountToBeTransfered));

      // update the reciever balance
      let balanceOfTheReciever = await getBalance(toPrincipalId);
      balanceHash.put(preparedToPrincipal, (balanceOfTheReciever + amountToBeTransfered));

      return "Success";
    };

    return "Insufficient balance";
  };

  system func preupgrade() {
    balanceArr := Iter.toArray(balanceHash.entries());
  };

  system func postupgrade() {
    balanceArr := [];
  };
};
