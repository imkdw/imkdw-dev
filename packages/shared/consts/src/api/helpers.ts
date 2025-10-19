import { API_ENDPOINTS } from './endpoints';

type ExtractParams<T extends string> = T extends `${string}:${infer Param}/${infer Rest}`
  ? { [K in Param]: string } & ExtractParams<Rest>
  : T extends `${string}:${infer Param}`
    ? { [K in Param]: string }
    : unknown;

type HasParams<T extends keyof typeof API_ENDPOINTS> = [keyof ExtractParams<(typeof API_ENDPOINTS)[T]>] extends [never]
  ? false
  : true;

export function buildEndpoint<T extends keyof typeof API_ENDPOINTS>(
  endpoint: T,
  ...args: HasParams<T> extends true ? [params: ExtractParams<(typeof API_ENDPOINTS)[T]>] : []
): string {
  const path = API_ENDPOINTS[endpoint];

  if (args.length === 0) {
    return path;
  }

  const params = args[0] as Record<string, string>;
  return path.replace(/:(\w+)/g, (_, key) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`Missing parameter: ${key}`);
    }
    return value;
  });
}
