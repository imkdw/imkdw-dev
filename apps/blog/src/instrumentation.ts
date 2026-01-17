export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    // 서버 사이드에서만 실행되는 초기화 코드
  }
}

export function onRequestError(
  error: Error,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | string[] | undefined>;
  },
  context: {
    routerKind: 'Pages Router' | 'App Router';
    routePath: string;
    routeType: 'render' | 'route' | 'action' | 'middleware';
    revalidateReason?: 'on-demand' | 'stale' | undefined;
  }
) {
  if (process.env.NODE_ENV === 'development') {
    console.error('[Instrumentation Error]', {
      error: error.message,
      path: request.path,
      method: request.method,
      routePath: context.routePath,
      routeType: context.routeType,
    });
  }
}
