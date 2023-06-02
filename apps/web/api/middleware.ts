import { cookies } from "next/headers";
import { Middleware } from "./interfaces";

export const addAuthorizationHeader: Middleware = ({ options }) => {
  const session = cookies().get("session");

  const requestOptions = session
    ? {
        ...options,
        headers: {
          ...options.headers,
          authorization: `Bearer ${session}`,
        },
      }
    : options;

  return requestOptions;
};
