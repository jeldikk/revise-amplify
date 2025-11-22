"use client";

import { signOut } from "aws-amplify/auth";
import { useEffect } from "react";

export default function LogoutPage() {
  useEffect(() => {
    signOut();
  }, []);
  return (
    <div>
      <h1>Logout Page</h1>
    </div>
  );
}
