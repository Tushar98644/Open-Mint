"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "@/lib/client";
import { generatePayload, isLoggedIn, login, logout } from "./actions/auth";

export const LoginButton = () => {
  return (
    <ConnectButton
      client={client}
      auth={{
        isLoggedIn: async (address) => {
          console.log("Checking if logged in:", { address });
          return await isLoggedIn(); 
        },
        doLogin: async (params) => {
          console.log("Logging in with params:", params);
          await login(params); 
        },
        getLoginPayload: async ({ address }) => {
          console.log("Generating login payload for address:", address);
          return await generatePayload({ address }); 
        },
        doLogout: async () => {
          console.log("Logging out!");
          await logout();
        },
      }}
    />
  );
};
