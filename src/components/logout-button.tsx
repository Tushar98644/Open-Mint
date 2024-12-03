"use client";

import { logout } from "@/components/connect-button/actions/auth";

export const LogOutButton: React.FC = () => {
  async function handleClick() {
    await logout();
  }
  return <button onClick={handleClick}>Log out</button>;
};
