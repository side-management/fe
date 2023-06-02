import { Middleware, OnRequestSuccess } from "./interfaces";
import { addAuthorizationHeader } from "./middleware";

class API {
  controller: AbortController;
  signal: AbortSignal;
  baseUrl: string;
  defaultOptions: RequestInit;
  middleware: Array<Middleware>;
  _onRequestSuccess?: OnRequestSuccess;

  constructor(baseUrl: string, defaultOptions: RequestInit) {
    this.controller = new AbortController();
    this.signal = this.controller.signal;

    this.baseUrl = baseUrl;
    this.defaultOptions = defaultOptions;
    this.middleware = [];

    this.use(addAuthorizationHeader);
  }

  private applyMiddleware(url: string, options: RequestInit) {
    let modifiedOptions = options;

    this.middleware.forEach((middleware) => {
      modifiedOptions = middleware({ url, options: modifiedOptions });
    });

    return modifiedOptions;
  }

  private applyOnRequestSuccess<T>(response: T) {
    const modifiedResponse = this._onRequestSuccess?.<T>(response);

    const responseWithSuccess = modifiedResponse || response;

    return responseWithSuccess;
  }

  private async apiCall<T>(url: string, options: RequestInit) {
    const modifiedOptions = this.applyMiddleware(url, options);

    const requestUrl = url.startsWith("/") ? url : `/${url}`;

    const response = await fetch(
      `${this.baseUrl}${requestUrl}`,
      modifiedOptions
    );

    if (!response.ok) throw new Error(response.statusText);

    return this.applyOnRequestSuccess((await response.json()) as T);
  }

  onRequestSuccess(onRequestSuccess: OnRequestSuccess) {
    this._onRequestSuccess = onRequestSuccess;
  }

  use(middleware: Middleware) {
    this.middleware.push(middleware);
  }

  get<T>(url: string, options: RequestInit) {
    const apiOptions = {
      ...this.defaultOptions,
      ...options,
      method: "GET",
      signal: this.signal,
    };

    return this.apiCall<T>(url, apiOptions);
  }

  post<T>(url: string, body: Record<string, unknown>, options: RequestInit) {
    const apiOptions = {
      ...this.defaultOptions,
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      signal: this.signal,
    };

    return this.apiCall<T>(url, apiOptions);
  }
}

export default API;
