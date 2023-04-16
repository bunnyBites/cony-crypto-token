import React from 'react'
import { AuthClient } from "@dfinity/auth-client";
import ReactDOM from 'react-dom'
import App from "./components/App";

const init = async () => {
  const authClient = await AuthClient.create();

  if (authClient.isAuthenticated()) {
    ReactDOM.render(<App />, document.getElementById("root"));
  } else {
    await authClient.login({
      identityProvider: "https://identity.ic0.app/#authorize",
      onSuccess: () => {
        ReactDOM.render(<App />, document.getElementById("root"));
      }
    })
  }
}

init();


