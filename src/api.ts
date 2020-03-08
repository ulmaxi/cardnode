/**
 * The API Server base URL
 */
export const APIBASEURL =
  process.env.NODE_ENV === 'production'
    ? 'api.ulmax.tech'
    : 'http://localhost:4000';

/**
 * The api route based on the baseUrl
 */

export const ApiPath = (path: string) => `${APIBASEURL}/${path}`;

/**
 * parse the fetch to json response
 */
export function fetchToJson<T>(res: Response) {
  console.log(res);
  if (res.status >= 400) {
    throw new Error('Bad response from server');
  }

  return res.json() as Promise<T>;
}
