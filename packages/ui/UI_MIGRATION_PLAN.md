# UI 컴포넌트 Headless UI 마이그레이션 계획

## 개요
현재 UI 패키지를 `/ui-prototype` 구조를 참조하여 Headless UI 기반으로 재구성하는 계획입니다.

## 현재 문제점

### 1. 과도하게 복잡한 컴포넌트 구조
- **터미널 테마**: 실제 사용하지 않을 과도한 커스텀 테마
- **복잡한 CVA 변형**: 너무 많은 variant, size, state 조합
- **불필요한 기능들**: loading states, helper text 등 과도한 기능

### 2. 실용성 부족
- `/design` 페이지가 LLM이 임의로 구성한 복잡한 예제들로 구성됨
- 실제 개발에서 사용할 간단한 패턴들이 부족
- ui-prototype의 깔끔하고 실용적인 구조와 차이

## 목표 구조 참조

**참조할 구조**: `/ui-prototype` 디렉토리의 구성을 따릅니다.

### ui-prototype 컴포넌트 목록 (50+ 컴포넌트)
```
- accordion.tsx          - navigation-menu.tsx
- alert-dialog.tsx       - pagination.tsx
- alert.tsx              - popover.tsx
- aspect-ratio.tsx       - progress.tsx
- avatar.tsx             - radio-group.tsx
- badge.tsx              - resizable.tsx
- breadcrumb.tsx         - scroll-area.tsx
- button.tsx             - select.tsx
- calendar.tsx           - separator.tsx
- card.tsx               - sheet.tsx
- carousel.tsx           - sidebar.tsx
- chart.tsx              - skeleton.tsx
- checkbox.tsx           - slider.tsx
- code-block.tsx         - sonner.tsx
- collapsible.tsx        - switch.tsx
- command.tsx            - table.tsx
- context-menu.tsx       - tabs.tsx
- dialog.tsx             - textarea.tsx
- drawer.tsx             - theme-provider.tsx
- dropdown-menu.tsx      - toast.tsx
- form.tsx               - toaster.tsx
- hover-card.tsx         - toggle-group.tsx
- input-otp.tsx          - toggle.tsx
- input.tsx              - tooltip.tsx
- label.tsx              - use-toast.ts
- menubar.tsx
```

## 마이그레이션 전략

### 1단계: 기존 컴포넌트 단순화

#### Button 컴포넌트
**현재**: 복잡한 CVA + 터미널 테마 + loading state
```typescript
// 제거할 것들
variant: primary, secondary, destructive, outline, ghost, terminal
size: xs, sm, md, lg, xl, icon
loading: boolean
```

**목표**: ui-prototype 수준의 단순함
```typescript
// 유지할 것들
variant: default, destructive, outline, secondary, ghost, link
size: default, sm, lg, icon
asChild: boolean (Headless UI 패턴)
```

#### Card 컴포넌트
**현재**: 복잡한 variant, size, shadow 조합
**목표**: 기본 구조만 유지 (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

#### Input 컴포넌트
**현재**: variant, size, state + label, helperText, errorMessage 등
**목표**: 기본 input + 필요시 label 분리

### 2단계: Headless UI 패턴 적용

#### 핵심 원칙
1. **asChild 패턴**: Radix UI의 Slot 컴포넌트 활용
2. **접근성 우선**: Headless UI의 접근성 패턴 적용
3. **합성 패턴**: 작은 컴포넌트들의 조합으로 복잡한 UI 구성
4. **제어되지 않는/제어되는 컴포넌트**: 둘 다 지원

#### 적용할 Headless UI 컴포넌트들
- Dialog → @headlessui/react Dialog
- Dropdown → @headlessui/react Menu
- Select → @headlessui/react Listbox
- Toggle → @headlessui/react Switch
- Tabs → @headlessui/react Tab

### 3단계: 디렉토리 구조 재정비

#### 현재 구조
```
packages/ui/src/
├── primitives/
│   ├── button/
│   ├── card/
│   ├── input/
│   ├── label/
│   └── badge/
├── lib/
└── tokens/
```

#### 목표 구조 (ui-prototype 참조)
```
packages/ui/src/
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── badge.tsx
│       └── ... (50+ 컴포넌트)
├── lib/
│   └── utils.ts
└── tokens/
```

### 4단계: /design 페이지 재구성

#### 제거할 것들
- 터미널 테마 관련 모든 예제
- 과도한 variant 조합 예제
- 복잡한 Combined Examples 섹션들
- 불필요한 상태 예제들

#### 유지/추가할 것들
- 기본 컴포넌트 사용법
- 실용적인 조합 예제 2-3개
- 색상 토큰 쇼케이스
- 깔끔한 그리드 레이아웃

## 구현 순서

1. **기존 컴포넌트 단순화** (Button, Card, Input, Label, Badge)
2. **누락된 핵심 컴포넌트 추가** (Dialog, Select, Tabs 등)
3. **디렉토리 구조 변경**
4. **design 페이지 전면 개편**
5. **패키지 export 업데이트**

## 참고 사항

- **스타일 유지**: 기존 디자인 토큰과 스타일은 최대한 유지
- **점진적 마이그레이션**: 한 번에 모든 걸 바꾸지 않고 단계적으로 진행
- **하위 호환성**: 가능한 한 기존 API와 호환되도록 구성
- **문서화**: 각 컴포넌트별 사용법 예제 제공

## 최종 목표

ui-prototype과 같은 **실용적이고 깔끔한 디자인 시스템**을 구축하되, **Headless UI의 접근성과 유연성**을 활용한 현대적인 컴포넌트 라이브러리 완성.