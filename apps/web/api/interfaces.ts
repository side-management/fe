export type Middleware = ({
  url,
  options,
}: {
  url: string;
  options: RequestInit;
}) => RequestInit;

export type OnRequestSuccess = <T>(response: T) => T | void;
