# 서버 통신 에러 처리 구현 계획 및 진행 상황

## 📌 프로젝트 개요

### 문제 상황
현재 서버 통신간 에러가 발생하는 경우에 대한 좋은 예외처리가 필요합니다.

### 현재 구조
1. **클라이언트 컴포넌트**: 서버 액션을 통해서 호출되며 ApiClient를 통해 실제 요청이 발생
2. **서버 컴포넌트**: 서버 액션을 통해서 호출되며 ApiClient를 통해 실제 요청이 발생

### 구현 목표
1. **클라이언트 컴포넌트**에서 에러 발생시 toast를 통해서 적절한 에러 응답
2. **서버 컴포넌트**에서 에러 발생시 정의된 notFound, forbidden 등 에러페이지로 이동

### 핵심 요구사항
- **Next.js 15** 함수 사용: `notFound()`, `forbidden()`, `unauthorized()`
- **중앙 집중식 처리**: 호출자가 클라이언트/서버 컴포넌트 구분 없이 사용
- **최소한의 코드 변경**: 기존 코드 수정 최소화

## 🏗️ Phase별 구현 계획

### **Phase 1: API Client 에러 정보 강화** ✅ **완료**
#### 목적
API 에러 응답에 errorCode를 포함하여 상세한 에러 정보 전달

#### 완료된 작업
1. **packages/api-client/src/types.ts**
   - ApiError 클래스에 `errorCode?: string` 필드 추가
   - ErrorResponse 타입 import 및 re-export

2. **packages/api-client/src/api-client.ts**
   - 에러 응답 파싱 로직 개선
   - `{ error: ErrorResponse }` 구조에서 errorCode 추출
   - timeout 및 네트워크 에러에서도 errorCode optional 처리

3. **packages/api-client/package.json**
   - `@imkdw-dev/types` 의존성 추가

#### 결과
- ApiError 인스턴스가 서버의 상세 에러 코드를 포함하게 됨
- 빌드 검증 완료

---

### **Phase 2: 서버 액션 래퍼 구현** 🔄 **다음 작업**
#### 목적
환경을 자동 감지하여 적절한 에러 처리를 수행하는 중앙 래퍼 함수 생성

#### 계획된 작업
1. **packages/actions/src/lib/action-wrapper.ts** (신규)
   ```typescript
   - 서버/클라이언트 환경 감지 로직
   - 서버: notFound(), forbidden(), unauthorized() 호출
   - 클라이언트: toast 자동 표시
   - 에러 코드별 한글 메시지 매핑
   ```

2. **에러 메시지 매핑 정의**
   - 각 ExceptionCode에 대한 사용자 친화적 메시지

#### 핵심 구현 포인트
- `typeof window === 'undefined'`로 서버/클라이언트 환경 감지
- 상태 코드별 적절한 처리:
  - 404 → `notFound()`
  - 403 → `forbidden()`
  - 401 → `unauthorized()`
  - 기타 → toast 표시

---

### **Phase 3: 기존 액션 함수 래핑** 📋 **대기**
#### 목적
모든 서버 액션에 에러 처리 래퍼 적용

#### 계획된 작업
1. **packages/actions/src/member.action.ts**
   - `getCurrentMember`, `getMember` 함수 래핑

2. **packages/actions/src/auth.action.ts**
   - `getOAuthUrl` 함수 래핑

#### 래핑 패턴
```typescript
export const getMember = withErrorHandling(async (id) => {
  return apiClient.get(...);
});
```

---

### **Phase 4: 통합 테스트 및 검증** 📋 **대기**
#### 목적
전체 시스템이 의도대로 동작하는지 검증

#### 테스트 시나리오
1. **클라이언트 컴포넌트 테스트**
   - 에러 발생 시 toast 표시 확인
   - 다양한 에러 코드 테스트

2. **서버 컴포넌트 테스트**
   - 404 에러 → notFound() 페이지
   - 403 에러 → forbidden() 페이지
   - 401 에러 → unauthorized() 페이지

3. **Playwright E2E 테스트**
   - 실제 사용자 시나리오 검증

## 📁 프로젝트 구조 분석

### 현재 에러 처리 흐름
```
API Server (CustomException)
→ ErrorResponse { statusCode, errorCode, message, timestamp, path }
→ ApiClient (ApiError 생성)
→ Server Actions (packages/actions)
→ Client/Server Components
```

### 기존 컴포넌트 구조
- **클라이언트 컴포넌트**: `'use client'` 지시어 사용, toast 시스템 활용 가능
- **서버 컴포넌트**: 서버에서 실행, Next.js 15 함수 사용 가능
- **Toast 시스템**: packages/ui에 이미 구현됨 (`useToast`, global `toast` 함수)

### 에러 응답 구조
```typescript
interface ErrorResponse {
  statusCode: number;
  errorCode: ExceptionCode;
  message: string;
  timestamp: string;
  path: string;
}
```

## 🎯 구현 목표 재확인

### 핵심 원칙
1. **투명한 에러 처리**: 호출자가 환경 구분 불필요
2. **최소한의 코드 변경**: 래퍼만 추가
3. **일관된 UX**: 모든 에러가 동일하게 처리
4. **Next.js 15 활용**: 공식 함수 사용

### 성공 기준
- 클라이언트에서 에러 시 적절한 toast 표시
- 서버에서 에러 시 적절한 페이지로 리다이렉션
- 기존 코드 변경 최소화
- 타입 안전성 보장

## 📅 다음 세션 작업 계획

### 즉시 진행할 작업
1. **Phase 2 시작**: `packages/actions/src/lib/action-wrapper.ts` 구현
2. 환경 감지 및 에러 처리 로직 작성
3. 에러 코드별 한글 메시지 매핑 정의

### 주의사항
- `typeof window === 'undefined'`로 서버/클라이언트 구분
- Next.js 15의 `notFound()`, `forbidden()`, `unauthorized()` 함수 사용
- 기존 toast 시스템 활용 (`@imkdw-dev/ui`의 toast 함수)
- 필요하지 않은 코드는 절대 작성하지 않기

### 테스트 계획
- 각 Phase 완료 후 단계별 검증
- 최종 Playwright E2E 테스트로 전체 시나리오 확인

---

**작성일**: 2025-01-20
**현재 진행률**: Phase 1 완료 (25%)
**다음 작업**: Phase 2 - 서버 액션 래퍼 구현