import React, { useState } from "react";
import { token } from "../../../declarations/token";

function Faucet() {
  const [btnText, setBtnText] = useState("Gimme gimme");
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = async () => {
    setIsDisabled(true);
    const fetchedButtonText = await token.claimTokens();
    setBtnText(fetchedButtonText)
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free Cony (Bunny) tokens here! Claim 10,000 DANG coins to your account.</label>
      <p className="trade-buttons">
        <button id="btn-payout" disabled={isDisabled} onClick={handleClick}>
          {btnText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
