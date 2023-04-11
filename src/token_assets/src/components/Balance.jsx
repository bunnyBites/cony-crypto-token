import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Balance() {
  const [principalId, setPrincipalId] = useState("");
  const [balance, setBalance] = useState("");

  async function handleClick() {
    const balance = await token.getBalance(principalId);
    setBalance(balance.toLocaleString());
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={principalId}
          onChange={(e) => setPrincipalId(e.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p>This account has a balance of {balance}</p>
    </div>
  );
}

export default Balance;
