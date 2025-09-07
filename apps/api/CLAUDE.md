# API Server Development Guide

이 파일은 NestJS API 서버 개발을 위한 가이드라인을 제공합니다.

## Architecture

### NestJS Application Structure
- Port 8000, feature-based modular architecture (`/features`, `/shared`, `/infra`)
- PostgreSQL database with Prisma ORM (split schema files in `prisma/schema/`)
- Swagger documentation available at `/api` in non-production environments
- API versioning enabled (default v1 via URI)
- Layered architecture: Controllers → Use Cases → Repositories
- Shared workspace packages for types, constants, and exceptions
- Separate test configurations: unit tests (`test/unit/`) and integration tests (`test/integration/`)
- Uses dotenv for environment configuration with `.env.test` for testing

### Layered Architecture
- **Features**: Business logic organized by domain (`/features/article`, `/features/auth`)
- **Shared**: Repositories, utilities, domain objects (`/shared`)
- **Infra**: Database, HTTP configurations (`/infra`)
- **Unidirectional dependencies**: Features → Shared → Infra
- **Domain-centric design**: Business logic separated from infrastructure concerns
- **Modular organization**: Each feature as self-contained NestJS module

### Database Schema Organization
- Split Prisma schema files by domain in `prisma/schema/`
- Main schema file imports domain-specific schemas
- Use workspace constants package for shared values across schema files

## Development Patterns

### DTO 패턴
- **타입 공유**: `packages/shared/types/src/dto/{feature}/` 에 인터페이스 우선 정의
- **인터페이스 implements**: API DTO 클래스는 shared 인터페이스를 implements 해야 함
- **독립적 작성**: PickType, OmitType 등 사용 금지 - 각 DTO 독립적으로 작성
- **Response DTO**: 204 No Content 응답일 경우 Response DTO 생성하지 않음

### Use Case 패턴
- **파일명**: `{action}-{entity}.use-case.ts` (예: `update-article.use-case.ts`)
- **도메인 객체**: 항상 `Entity.create()` 정적 메서드로 생성
- **업데이트 로직**: 새 객체 생성 방식 사용 (updateTitle, updateContent 같은 메서드 금지)

### Exception 패턴
- **파일명**: `{entity}-{error-type}.exception.ts` (예: `article-not-found.exception.ts`)
- **Exception 코드**: `packages/shared/exception/src/{feature}/` 에 정의
- **HttpStatus 사용**: NestJS HttpStatus enum 사용 (`HttpStatus.NO_CONTENT` 등)

### Validator 패턴
- **존재 확인**: `checkExist(id: string)` 메서드명 사용
- **중복 확인**: `checkExistTitle()` 형태로 명명

### Controller 패턴
- **HTTP 상태 코드**: HttpStatus enum 사용
- **204 응답**: `@HttpCode(HttpStatus.NO_CONTENT)` + `void` 반환

## Testing Guidelines

### 테스트 패턴
- **단위 테스트**: `{component}.spec.ts`
- **통합 테스트**: `{feature}.use-case.spec.ts` (integration 아님)
- **DTO 테스트**: 단위 테스트만 작성 (유효성 검증)
- **Use Case 테스트**: 통합 테스트 작성 (실제 DB 트랜잭션 사용)

### Test Commands
- `pnpm test` - Run all tests (unit + integration)
- `pnpm test:unit` - Run unit tests only
- `pnpm test:integration` - Run integration tests only (requires `.env.test`)
- `pnpm test:cov` - Run tests with coverage

## Feature Directory Structure

```
src/features/{feature}/
├── controller/{feature}.controller.ts
├── dto/
│   ├── create-{feature}.dto.ts
│   └── update-{feature}.dto.ts
├── exception/
│   ├── exist-{feature}.exception.ts
│   └── {feature}-not-found.exception.ts
├── swagger/{feature}.swagger.ts
├── use-case/
│   ├── create-{feature}.use-case.ts
│   └── update-{feature}.use-case.ts
├── validator/{feature}.validator.ts
└── {feature}.module.ts
```

## Database Management

### Prisma Commands
- `pnpm prisma generate` - Generate Prisma client

## Code Quality

### Linting & Type Checking
- `pnpm lint` - Run ESLint on API code