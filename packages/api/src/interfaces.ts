export type ModifyHeaders = ({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}) => RequestInit;

export type ModifyResponse = <T>(response: T) => T | void;

type StartsWith<Prefix extends string> = string extends Prefix
  ? boolean
  : Prefix extends ""
  ? string
  : `${Prefix}${string}`;

export type HttpString = StartsWith<"http://">;
export type HttpsString = StartsWith<"https://">;
