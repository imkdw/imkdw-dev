# VSCode Vibes Blog - LLM 생성 UI 프로토타입 프로젝트

## 📋 프로젝트 개요
**VSCode Vibes Blog**는 LLM(Large Language Model)을 활용하여 개발된 개발자 블로그 플랫폼 UI 프로토타입입니다. VSCode의 터미널 테마에서 영감을 받은 디자인으로, 개발자들을 위한 기술 블로그 플랫폼을 목표로 합니다.

## 🔧 기술 스택
- **Frontend Framework**: React 18.3.1 + TypeScript
- **Build Tool**: Vite 5.4.19
- **UI Framework**: shadcn/ui + Radix UI
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: TanStack React Query 5.83.0
- **Routing**: React Router DOM 6.30.1
- **Form Handling**: React Hook Form 7.61.1 + Zod 3.25.76
- **Icons**: Lucide React 0.462.0
- **Theme System**: next-themes 0.4.6
- **Code Highlighting**: prism-react-renderer 2.4.1

## 🎨 디자인 시스템
### 컬러 팔레트 (터미널 테마 기반)
- **Primary**: Terminal Green (142 76% 36%) - 주요 액션 및 브랜딩
- **Accent**: Blue (197 71% 52%) - 링크 및 강조
- **Background**: Dark Grey (220 13% 18%) - 다크모드 배경
- **Terminal Colors**: 전용 터미널 컬러셋 정의

### 특별 기능
- 다크/라이트 테마 지원 (기본: 다크)
- 터미널 스타일 UI 컴포넌트
- 반응형 디자인
- 애니메이션 시스템 (fade-in, slide-up, scale-in 등)

## 📁 프로젝트 구조
```
src/
├── components/           # 재사용 가능한 컴포넌트
│   ├── ui/              # shadcn/ui 기반 기본 UI 컴포넌트 (50+ 컴포넌트)
│   ├── layout/          # 레이아웃 컴포넌트 (Header, Footer, Sidebar 등)
│   ├── article/         # 아티클 관련 컴포넌트
│   ├── auth/            # 인증 관련 컴포넌트
│   ├── home/            # 홈페이지 전용 컴포넌트
│   ├── notifications/   # 알림 시스템
│   └── series/          # 시리즈 관련 컴포넌트
├── pages/               # 라우트 페이지 컴포넌트
├── hooks/               # 커스텀 React 훅
├── lib/                 # 유틸리티 및 설정
│   ├── design-tokens.ts # 디자인 토큰 시스템
│   └── utils.ts         # 공통 유틸리티
└── assets/              # 정적 자산
```

## 🌟 주요 기능 및 페이지
1. **메인 대시보드** (`/`) - 터미널 섹션 + 피처드 콘텐츠
2. **아티클 시스템** (`/articles/:slug`) - 상세보기, 작성, 편집
3. **시리즈 관리** (`/series`, `/series/:slug`) - 아티클 시리즈화
4. **사용자 프로필** (`/profile`) - 개인 정보 관리
5. **알림 센터** (`/notifications`) - 실시간 알림
6. **터미널 페이지** (`/terminal`) - 개발자 도구 시뮬레이션

## 💡 LLM 기반 설계 특징
- **컴포넌트 모듈화**: 재사용성을 고려한 작은 단위 컴포넌트 구조
- **타입 안전성**: TypeScript 기반 강타입 시스템
- **접근성**: Radix UI 기반 웹 접근성 지원
- **반응형**: 모바일 우선 반응형 디자인
- **확장성**: 플러그인 방식의 확장 가능한 아키텍처

## 🚀 개발 환경
- **Package Manager**: pnpm (lockfile 존재)
- **Development Server**: Vite Dev Server (포트 8080)
- **Build Target**: ES 모듈 (type: "module")
- **Code Quality**: ESLint + TypeScript

## 📦 마이그레이션 고려사항
1. **의존성 호환성**: 최신 React 18 + TypeScript 5 생태계
2. **스타일링 시스템**: Tailwind CSS + CSS Variables 조합
3. **컴포넌트 아키텍처**: shadcn/ui 기반 디자인 시스템
4. **상태 관리**: React Query 기반 서버 상태 관리
5. **라우팅**: React Router DOM v6 최신 패턴

## 📊 프로젝트 메트릭스
- **총 컴포넌트**: 80+ 컴포넌트
- **UI 컴포넌트**: 50+ shadcn/ui 컴포넌트
- **페이지**: 9개 주요 페이지
- **라우트**: 8개 정의된 라우트
- **의존성**: 64개 production 의존성

## 🔗 주요 의존성
### Core Framework
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `typescript`: ^5.8.3
- `vite`: ^5.4.19

### UI & Styling
- `@radix-ui/*`: 23개 UI 프리미티브
- `tailwindcss`: ^3.4.17
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `lucide-react`: ^0.462.0

### State & Routing
- `@tanstack/react-query`: ^5.83.0
- `react-router-dom`: ^6.30.1
- `react-hook-form`: ^7.61.1
- `zod`: ^3.25.76

### Development Tools
- `lovable-tagger`: ^1.1.9 (LLM 개발 태깅 도구)
- `@vitejs/plugin-react-swc`: ^3.11.0
- `eslint`: ^9.32.0

**이 프로젝트는 LLM의 도움으로 체계적으로 구성된 현대적인 React 애플리케이션으로, 다른 프로젝트로의 이전 시 위의 기술 스택과 아키텍처 패턴을 참고하여 적용할 수 있습니다.**