"use client";
import React, { createContext, useEffect, useState } from "react";
import { Hub } from "aws-amplify/utils";
import { AuthUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";

export interface IAuthDetails {
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: AuthUser | null;
}

export interface IAuthDetailsContext {
  authDetails: IAuthDetails | null;
}

export const AuthDetailsContext = createContext<IAuthDetailsContext | null>(
  null
);

interface Props {
  details: IAuthDetails;
  children: React.ReactNode;
}

export default function AuthDetailsContextProvider(props: Props) {
  const router = useRouter();
  const [authDetails, setAuthDetails] = useState<IAuthDetails>(props.details);

  useEffect(() => {
    const authSub = Hub.listen("auth", (data) => {
      const { payload } = data;
      console.log({ data });
      switch (payload.event) {
        case "signedIn":
          setAuthDetails({
            isAuthenticated: true,
            isAdmin: false,
            user: payload.data,
          });
          router.push("/");
          break;
        case "signedOut":
          setAuthDetails({
            isAuthenticated: false,
            isAdmin: false,
            user: null,
          });
          router.push("/login");
          break;
      }
    });

    return () => {
      authSub();
    };
  }, []);
  return (
    <AuthDetailsContext.Provider value={{ authDetails }}>
      {props.children}
    </AuthDetailsContext.Provider>
  );
}
