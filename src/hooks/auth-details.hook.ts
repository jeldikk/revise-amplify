import { useContext } from "react";
import {
  IAuthDetailsContext,
  AuthDetailsContext,
} from "../context/auth.context";

export default function useAuthDetails() {
  const authDetails = useContext<IAuthDetailsContext | null>(
    AuthDetailsContext
  );
  if (!authDetails) {
    throw new Error(
      "useAuthDetails must be used within an AuthDetailsContextProvider"
    );
  }
  return authDetails;
}
