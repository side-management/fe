import {
  HttpsString,
  HttpString,
  ModifyHeaders,
  ModifyResponse,
} from "./interfaces";

const httpUrlRegex = /^(http|https):\/\/[^ "]+$/;

export class API {
  private baseUrl: string;
  private defaultOptions: RequestInit;
  private modifyHeaders: Array<ModifyHeaders>;
  private modifyResponse?: ModifyResponse;

  constructor(
    baseUrl: HttpString | HttpsString,
    defaultOptions: RequestInit = {}
  ) {
    if (httpUrlRegex.test(baseUrl) === false)
      throw new Error("Invalid base URL");

    this.baseUrl = baseUrl;
    this.defaultOptions = defaultOptions;
    this.modifyHeaders = [];
  }

  private applyModifyHeaders(url: string, options: RequestInit) {
    let modifiedOptions = options;

    this.modifyHeaders.forEach((modifyHeaders) => {
      modifiedOptions = modifyHeaders({ url, options: modifiedOptions });
    });

    return modifiedOptions;
  }

  private applyModifyResponse<T>(response: T) {
    const modifiedResponse = this.modifyResponse?.<T>(response);

    const responseWithSuccess = modifiedResponse || response;

    return responseWithSuccess;
  }

  private async apiCall<T>(url: string, options: RequestInit) {
    const modifiedOptions = this.applyModifyHeaders(url, options);

    const requestUrl = url.startsWith("/") ? url : `/${url}`;

    const response = await fetch(
      `${this.baseUrl}${requestUrl}`,
      modifiedOptions
    );

    if (!response.ok) throw new Error(response.statusText);

    const responseWithSuccess = (await response.json()) as T extends {
      error: string;
    }
      ? T
      : T & { error: string };

    // TODO: 에러 처리
    if (responseWithSuccess.error) {
      throw new Error(responseWithSuccess.error);
    }

    return this.applyModifyResponse(responseWithSuccess);
  }

  useModifyResponse(modifyResponse: ModifyResponse) {
    this.modifyResponse = modifyResponse;
  }

  useModifyHeaders(modifyHeaders: ModifyHeaders) {
    this.modifyHeaders.push(modifyHeaders);
  }

  get<T>(
    url: string,
    params: Record<string, unknown> = {},
    options: RequestInit = {}
  ) {
    const entries = Object.entries(params).map(([key, value]) => [
      key,
      JSON.stringify(value),
    ]);
    const searchParams = new URLSearchParams(entries).toString();

    const apiOptions = {
      ...this.defaultOptions,
      ...options,
      method: "GET",
    };

    return this.apiCall<T>(`${url}?${searchParams}`, apiOptions);
  }

  post<T>(
    url: string,
    body: Record<string, unknown> = {},
    options: RequestInit = {}
  ) {
    const apiOptions = {
      ...this.defaultOptions,
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    };

    return this.apiCall<T>(url, apiOptions);
  }
}
