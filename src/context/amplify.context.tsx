"use client";
import React from "react";
import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import config from "../../amplify_outputs.json";

Amplify.configure(config, {
  ssr: true,
});

interface Props {
  children: React.ReactNode;
}

export default function AmplifyContext(props: Props) {
  const { children } = props;
  return <Authenticator.Provider>{children}</Authenticator.Provider>;
}
