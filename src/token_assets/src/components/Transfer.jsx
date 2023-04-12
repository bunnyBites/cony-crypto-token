import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Transfer() {
  const [isDisabled, setDisabled] = useState(false);
  const [transferStatus, setTransferStatus] = useState("");
  const [principalObj, setPrincipalObj] = useState({
    principalId: "",
    amount: "",
  });

  const handleClick = async () => {
    if (!principalObj.principalId || !principalObj.amount) return;

    setDisabled(true);

    const result = await token.transfer(
      principalObj.principalId,
      Number(principalObj.amount)
    );

    setTransferStatus(result);
    setDisabled(false);
  };

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={principalObj.principalId}
                onChange={(e) => {
                  setPrincipalObj({ ...principalObj, principalId: e.target.value});
                }}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={principalObj.amount}
                onChange={(e) => {
                  setPrincipalObj({ ...principalObj, amount: e.target.value});
                }}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={isDisabled} id="btn-transfer" onClick={handleClick}>
            Transfer
          </button>
        </p>
      </div>
      {!!transferStatus && <p>{transferStatus}</p>}
    </div>
  );
}

export default Transfer;
