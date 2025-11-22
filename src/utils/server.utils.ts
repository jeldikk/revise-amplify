import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import config from "@/../amplify_outputs.json";
import { cookies } from "next/headers";
import { generateServerClientUsingCookies } from "@aws-amplify/adapter-nextjs/api";
import { Schema } from "../../amplify/data/resource";
import { getCurrentUser, fetchAuthSession } from "aws-amplify/auth/server";
import { IAuthDetails } from "@/context/auth.context";

const { runWithAmplifyServerContext } = createServerRunner({ config });

export const cookiesServerClient = generateServerClientUsingCookies<Schema>({
  config,
  cookies,
});

export async function getAuthenticatedUser(): Promise<IAuthDetails> {
  try {
    const user = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: async (contextSpec) => {
        try {
          const userDetails = await getCurrentUser(contextSpec);
          return userDetails;
        } catch (err) {
          return null;
        }
      },
    });
    const isAuthenticated = !!(user && user.userId);
    return {
      isAuthenticated,
      isAdmin: false,
      user,
    };
  } catch (err) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    };
  }
}

export async function isAdminUser(): Promise<boolean> {
  return false;
}
