import { cookies } from "next/headers";
import { ModifyHeaders } from "api";

export const addAuthorizationHeader: ModifyHeaders = ({ options }) => {
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
