"use client";

import useAuthDetails from "@/hooks/auth-details.hook";
import { signOut } from "aws-amplify/auth";

export default function Header() {
  const authData = useAuthDetails();
  console.log({ authData });

  function handleLogout() {
    signOut();
  }
  return (
    <header className="header">
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn text-xl">Revise Amplify</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              {authData.authDetails?.isAuthenticated ? (
                <a href="/logout">Logout</a>
              ) : (
                <a href="/login">Login</a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
