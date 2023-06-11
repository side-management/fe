export type ModifyHeaders = ({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}) => RequestInit;

export type ModifyResponse = <T>(response: T) => T | void;
