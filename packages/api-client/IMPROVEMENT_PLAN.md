# API Client 패키지 개선 계획서

> 분석일: 2026-01-20
> 대상: `@imkdw-dev/api-client`
> 분석 도구: Claude Code (Opus 4.5) + 병렬 에이전트 분석

---

## 📊 분석 결과 요약

| 항목            | 평가 | 비고                         |
| --------------- | ---- | ---------------------------- |
| **전체 성숙도** | 6/10 | MVP 수준, 프로덕션 개선 필요 |
| **타입 안전성** | 7/10 | 강점이나 일부 허점           |
| **코드 품질**   | 5/10 | 심각한 중복                  |
| **아키텍처**    | 6/10 | 좋은 기반, 추상화 부족       |
| **확장성**      | 4/10 | 인터셉터/재시도 없음         |

---

## 📁 현재 패키지 구조

```
packages/api-client/
├── src/
│   ├── index.ts              # 메인 export
│   ├── api-client.ts         # 서버 클라이언트 (Next.js SSR) - 236줄
│   ├── api-client-browser.ts # 브라우저 클라이언트 - 168줄
│   ├── instance.ts           # 환경별 싱글톤 팩토리
│   ├── types.ts              # 타입 정의
│   ├── lib/
│   │   └── error-handler.ts  # 에러 핸들링 HOC
│   └── api/
│       ├── index.ts          # API 함수 export
│       ├── article.ts        # 게시글 API
│       ├── article-comment.ts # 댓글 API
│       ├── auth.ts           # 인증 API
│       ├── member.ts         # 회원 API
│       ├── seo.ts            # SEO API
│       ├── series.ts         # 시리즈 API
│       ├── stats.ts          # 통계 API
│       ├── storage.ts        # 스토리지 API
│       └── tag.ts            # 태그 API
└── dist/                     # 빌드 출력
```

---

## 🚨 P0: CRITICAL - 즉시 수정 필요

### 1. Null Pointer 버그
- **파일**: `api-client-browser.ts:66`
- **문제**: API가 flat error 반환시 런타임 크래시
- **현재 코드**:
  ```typescript
  const errorResponse: ErrorResponse = errorData.error;
  ```
- **수정 코드**:
  ```typescript
  const errorResponse: ErrorResponse = errorData.error ?? errorData;
  ```

### 2. 무한 재시도 루프
- **파일**: `api-client.ts:99-104`
- **문제**: 토큰 갱신 성공 후 재요청이 다시 401이면 무한 재귀
- **해결**: 재시도 카운터 또는 플래그 추가
- **수정 코드**:
  ```typescript
  private async request<T = unknown>(
    method: HttpMethod,
    path: string,
    body?: unknown,
    options?: RequestOptions,
    isRetry = false  // 추가
  ): Promise<T> {
    // ... 기존 코드 ...

    if (error.status === 401 && !isRetry) {  // isRetry 체크 추가
      const refreshed = await this.handleTokenRefresh();
      if (refreshed) {
        return this.request<T>(method, path, body, options, true);  // isRetry = true
      }
    }
  }
  ```

### 3. 비작동 코드 제거
- **파일**: `api-client.ts:200-235`
- **문제**: `applySetCookie()` 메서드가 Next.js Server Components에서 실행되지만, `cookies()` 스토어는 **읽기 전용**
- **해결**: 해당 메서드 제거 또는 주석 처리 (HTTP-only 쿠키는 서버가 자동 처리)

### 4. 에러 핸들러 누락
- **파일**: `storage.ts:5-9`
- **문제**: 유일하게 `withErrorHandling` 미적용
- **수정 코드**:
  ```typescript
  import { withErrorHandling } from '../lib/error-handler';

  export const getUploadUrl = withErrorHandling(
    async (fileName: string, extension: string): Promise<IResponseGetUploadUrlDto> => {
      return getApiClient().get<IResponseGetUploadUrlDto>(buildEndpoint('GET_UPLOAD_URL'), {
        query: { fileName, extension },
      });
    }
  );
  ```

---

## 🔴 P1: HIGH - 단기 개선 필요

### 5. 90% 코드 중복 해결

| 메서드                    | 중복률 | 차이점             |
| ------------------------- | ------ | ------------------ |
| constructor               | 100%   | -                  |
| request()                 | ~90%   | cookie 처리만 다름 |
| get/post/put/patch/delete | 100%   | -                  |
| handleTokenRefresh()      | 100%   | -                  |
| refreshToken()            | ~80%   | cookie 적용 로직   |

**해결 방안**: `BaseApiClient` 추상 클래스 추출

```typescript
// base-client.ts (신규)
export abstract class BaseApiClient {
  protected readonly baseURL: string;
  protected readonly defaultHeaders: Record<string, string>;
  protected readonly timeout: number;
  protected readonly version: number;
  protected refreshPromise: Promise<boolean> | null = null;

  constructor(config: ApiClientConfig) {
    this.baseURL = config.baseURL.replace(/\/$/, '');
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...config.headers,
    };
    this.timeout = config.timeout ?? 10000;
    this.version = config.version;
  }

  // 공통 메서드들...

  // 환경별 구현 필요
  protected abstract getCredentials(): RequestCredentials | undefined;
  protected abstract getCookieHeaders(): Promise<Record<string, string>>;
  protected abstract refreshToken(): Promise<boolean>;
}
```

### 6. 에러 핸들러 제어 흐름 버그
- **파일**: `error-handler.ts:55-59`
- **문제**: `handleServerError` 반환값 무시, `handleClientError` await 누락
- **수정 코드**:
  ```typescript
  if (isServer) {
    return handleServerError(error);  // return 추가
  } else {
    await handleClientError(error);  // await 추가
  }
  ```

### 7. 이중 에러 핸들링
- **파일**: `member.ts:6-12`
- **문제**: `withErrorHandling` 내부에서 또 try-catch로 모든 에러 삼킴
- **해결**: 내부 try-catch 제거하고 401 전용 처리 분리

---

## 🟡 P2: MEDIUM - 중기 개선

### 8. Race Condition
- **파일**: `api-client.ts:158-162`
- **문제**: `refreshPromise` 체크와 할당이 비원자적
- **해결**: mutex 패턴 또는 Promise 체이닝

### 9. 타입 캐스팅 위험
- **파일**: `api-client.ts:94`
- **문제**: `response.text() as T` - 런타임 불일치 가능
- **해결**: 런타임 타입 검증 추가

### 10. 쿠키 파싱 취약점
- **파일**: `api-client.ts:209`
- **문제**: `=` 포함 값, 인코딩된 값 처리 못함
- **해결**: 쿠키 파서 라이브러리 사용 또는 제거

### 11. 하드코딩된 메시지
- **파일**: `error-handler.ts:33`
- **문제**: `'서버와의 통신에 실패했습니다.'` i18n 불가
- **해결**: 상수 또는 i18n 키로 분리

---

## 🟢 P3: LOW - 장기 개선

### 12. 인터셉터 시스템 도입
```typescript
// interceptor.ts (신규)
export interface RequestInterceptor {
  onRequest(config: RequestConfig): RequestConfig | Promise<RequestConfig>;
}

export interface ResponseInterceptor {
  onResponse<T>(response: T): T | Promise<T>;
  onError(error: ApiError): ApiError | Promise<ApiError>;
}
```

### 13. 재시도 로직 (지수 백오프)
```typescript
// retry.ts (신규)
export interface RetryConfig {
  maxRetries: number;
  baseDelay: number;
  retryableStatuses: number[];
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig
): Promise<T> {
  // 지수 백오프 구현
}
```

### 14. 공통 인터페이스 정의
```typescript
// types.ts에 추가
export interface IApiClient {
  get<T>(path: string, options?: RequestOptions): Promise<T>;
  post<Req, Res>(path: string, data?: Req, options?: RequestOptions): Promise<Res>;
  put<Req, Res>(path: string, data?: Req, options?: RequestOptions): Promise<Res>;
  patch<Req, Res>(path: string, data?: Req, options?: RequestOptions): Promise<Res>;
  delete<T>(path: string, options?: RequestOptions): Promise<T>;
}
```

### 15. dist 정리
- `api-client-v2.js`, `browser-context.js`, `draft.js` 등 src에 없는 파일 존재
- `pnpm clean && pnpm build` 실행 필요

---

## 📐 권장 아키텍처

### 현재 vs 목표

```
[현재]                              [목표]
ApiClient ─────┐                   BaseApiClient (공통 로직)
               │ 90% 중복                │
ApiClientBrowser ─┘                 ├── ServerStrategy
                                    └── BrowserStrategy
```

### 목표 디렉토리 구조

```
src/
├── core/
│   ├── base-client.ts          # 공통 로직
│   ├── http-strategy.ts        # 환경별 전략 인터페이스
│   ├── server-strategy.ts      # 서버 쿠키 전략
│   └── browser-strategy.ts     # 브라우저 credentials 전략
├── interceptors/
│   ├── auth-interceptor.ts     # 토큰 갱신
│   ├── retry-interceptor.ts    # 재시도 로직
│   └── logging-interceptor.ts  # 로깅
├── api/                        # 기존 유지
│   ├── article.ts
│   ├── auth.ts
│   └── ...
├── lib/
│   └── error-handler.ts
├── types.ts
├── instance.ts
└── index.ts
```

---

## ✅ 현재 강점 (유지할 것)

1. **타입 안전한 엔드포인트 빌더** - `buildEndpoint()` 템플릿 리터럴 타입
2. **구조화된 에러 코드 매핑** - `ExceptionCode` enum 활용
3. **환경별 싱글톤 캐싱** - 인스턴스 재사용
4. **도메인 기반 파일 구조** - article, auth, member 등 분리
5. **공유 타입 패키지 활용** - `@imkdw-dev/types` 일관성

---

## 📚 참고 자료

- [TypeScript Guidelines: API Design | Azure SDKs](https://azure.github.io/azure-sdk/typescript_design.html)
- [Building Robust Client Libraries for Your Application](https://kanakkholwal.medium.com/building-robust-client-libraries-for-your-application-best-practices-for-javascript-and-typescript-769108d5c8ba)
- [How to write the right API client in TypeScript](https://dev.to/ra1nbow1/how-to-write-the-right-api-client-in-typescript-38g3)
- [TypeScript Best Practices for Large-Scale Web Applications in 2026](https://johal.in/typescript-best-practices-for-large-scale-web-applications-in-2026/)

---

## 📋 작업 체크리스트

### Phase 1: Critical Fixes (P0)
- [ ] `api-client-browser.ts:66` - null 체크 추가
- [ ] `api-client.ts:99-104` - 재시도 횟수 제한
- [ ] `api-client.ts:200-235` - 비작동 코드 제거/주석
- [ ] `storage.ts` - `withErrorHandling` 적용

### Phase 2: High Priority (P1)
- [ ] `BaseApiClient` 추상 클래스 추출
- [ ] `error-handler.ts` 제어 흐름 수정
- [ ] `member.ts` 이중 에러 핸들링 제거

### Phase 3: Medium Priority (P2)
- [ ] Race condition 수정
- [ ] 타입 캐스팅 검증 추가
- [ ] 쿠키 파싱 개선/제거
- [ ] i18n 메시지 분리

### Phase 4: Low Priority (P3)
- [ ] 인터셉터 시스템 도입
- [ ] 재시도 로직 추가
- [ ] 공통 인터페이스 정의
- [ ] dist 정리
