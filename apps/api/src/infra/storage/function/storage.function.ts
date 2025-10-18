export interface GetPathParams {
  id: string;
  prefix: string;
}

/**
 * 스토리지 경로 생성
 * @example
 * ```ts
 * const path = getStoragePath([{ id: '123', prefix: 'test' }]);
 * // => 'test/123'
 * ```
 */
export function getStoragePath(params: GetPathParams[]): string {
  const path = params.reduce((acc, param) => `${acc}/${param.prefix}/${param.id}`, '').slice(1);
  return `${path}`.replaceAll('//', '/');
}
