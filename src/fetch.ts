import { AuthHeaderKeys, SecurityKeys } from '@ulmax/frontend';
import fetch from 'cross-fetch';

/**
 * The secret for the key type authorization
 */
export interface AuthorizedSecret {
  keyType: 'JWT' | 'APIKEY';
  value: string;
}

interface RequestFactory {
  method: string;
  route: string;
  query?: any;
  body?: object;
}

/**
 * FETCH API FOR ULMAX
 */
export class UlmaxFetch {
  /**
   * the jwt secret for user authentication
   */
  private authSecret: AuthorizedSecret | null = null;

  constructor() {}

  /**
   * Sends a GET rest request to the route requested
   */
  async GET<T, B=any>(route: string, query?: B) {
    return await this.fetchToJson<T>(
      await fetch(`${this.ApiPath(route)}?${this.queryParam(query as any)}`, {
        method: 'GET',
        headers: this.headers,
      }),
    );
  }

  /**
   * sends a post request to the route with the body
   */
  POST<T, B, C=any>(route: string, body: B, query?: C) {
    return this.requestFactory<T>({
      route,
      query,
      body: body as any,
      method: 'POST',
    });
  }

  /**
   * sends a put request to the route with the body and optional query
   */
  PUT<T, B, C=any>(route: string, body: B, query?: C) {
    return this.requestFactory<T>({
      route,
      query,
      body: body as any,
      method: 'PUT',
    });
  }

  /**
   * sends a delete request to the route with optional query
   * and body
   */
  Delete<T, B=any, C=any>(route: string, body?: B, query?: C) {
    return this.requestFactory<T>({
      route,
      query,
      body: body as any,
      method: 'POST',
    });
  }

  /**
   * create request of various methods
   * */
  private async requestFactory<T>({
    route,
    body,
    query,
    method,
  }: RequestFactory) {
    return await this.fetchToJson<T>(
      await fetch(`${this.ApiPath(route)}`, {
        body: JSON.stringify(body || {}) as any,
        method: method,
        headers: this.headers,
      }),
    );
  }

  /**
   * sets the header keys with authorization if it exists
   */
  private get headers() {
    const isAPIKEY = this.authSecret?.keyType === 'APIKEY';
    const { APIKEY, JWT } = AuthHeaderKeys;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      [isAPIKEY ? APIKEY.toString() : JWT.toString()]:
        this.authSecret?.value ?? ``,
    };
    return headers;
  }

  /**
   * formats the query to appendable url strings
   */
  private queryParam(query: any) {
    if (typeof query === 'string' || !query) {
      return query ?? '';
    }
    return new URLSearchParams(Object.entries(query || {})).toString();
  }

  /**
   * updates the JWT Authentication for the users
   */
  authorized({ apiKey, jwt }: SecurityKeys) {
    if (apiKey) {
      this.authSecret = {
        keyType: 'APIKEY',
        value: apiKey,
      };
      return;
    }
    this.authSecret = {
      keyType: 'JWT',
      value: jwt,
    };
  }

  /**
   * The api route based on the baseUrl
   */
  private ApiPath(path: string) {
    return `${UlmaxFetch.APIBASEURL}/${path}`;
  }

  /**
   * parse the fetch to json response
   */
  private fetchToJson<T>(res: Response) {
    if (res.status >= 400) {
      throw new Error('Bad response from server');
    }
    return res.json() as Promise<T>;
  }

  /**
   * The API Server base URL
   */
  static APIBASEURL =
    process.env.NODE_ENV === 'production'
      ? 'api.ulmax.tech'
      : 'http://localhost:4001';
}

const FETCH = new UlmaxFetch();

/**
 * the globalized fetch Api for ulmax application
 */
export default FETCH;
