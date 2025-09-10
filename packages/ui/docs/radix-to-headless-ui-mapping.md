# Radix UI → Headless UI 매핑 전략

## 개요
프로토타입에서 사용된 Radix UI 컴포넌트들을 Headless UI 컴포넌트로 마이그레이션하는 전략 문서입니다.
기존 UI 패키지의 Headless UI 패턴과 일관성을 유지하면서 터미널 테마를 적용합니다.

## 직접 매핑 가능한 컴포넌트

### 1. Dialog 시스템
```
Radix UI                    →  Headless UI
@radix-ui/react-dialog      →  @headlessui/react Dialog
@radix-ui/react-alert-dialog →  @headlessui/react Dialog (변형)
```
- **구현 우선순위**: 높음
- **사용처**: LoginModal, ConfirmDialog, AlertDialog
- **마이그레이션 노트**: Headless UI Dialog는 더 간단한 API 제공

### 2. Dropdown/Menu 시스템
```
Radix UI                     →  Headless UI
@radix-ui/react-dropdown-menu →  @headlessui/react Menu
@radix-ui/react-context-menu  →  @headlessui/react Menu (context 변형)
@radix-ui/react-menubar       →  @headlessui/react Menu (조합)
```
- **구현 우선순위**: 높음
- **사용처**: UserMenu, 테마 선택, 언어 선택
- **마이그레이션 노트**: Menu trigger와 items 패턴 조정 필요

### 3. Disclosure/Collapsible 시스템
```
Radix UI                      →  Headless UI
@radix-ui/react-accordion     →  @headlessui/react Disclosure
@radix-ui/react-collapsible   →  @headlessui/react Disclosure
```
- **구현 우선순위**: 중간
- **사용처**: FAQ, 카테고리 접기/펼치기, 사이드바 섹션
- **마이그레이션 노트**: 단일/다중 열기 로직 구현 필요

### 4. Form 관련 컴포넌트
```
Radix UI                    →  Headless UI
@radix-ui/react-switch      →  @headlessui/react Switch
@radix-ui/react-radio-group →  @headlessui/react RadioGroup
@radix-ui/react-checkbox    →  커스텀 구현 (Headless UI 미제공)
```
- **구현 우선순위**: 중간
- **사용처**: 설정 페이지, 필터링, 폼
- **마이그레이션 노트**: Checkbox는 커스텀 구현 필요

### 5. 선택/검색 시스템
```
Radix UI                      →  Headless UI
@radix-ui/react-select        →  @headlessui/react Listbox
@radix-ui/react-command       →  @headlessui/react Combobox
```
- **구현 우선순위**: 높음
- **사용처**: 언어 선택, 태그 선택, 검색 자동완성
- **마이그레이션 노트**: Combobox로 검색 기능 구현 가능

### 6. Tab 시스템
```
Radix UI                →  Headless UI
@radix-ui/react-tabs    →  @headlessui/react Tab
```
- **구현 우선순위**: 중간
- **사용처**: 설정 페이지, 아티클 카테고리
- **마이그레이션 노트**: API가 매우 유사함

### 7. Popover 시스템
```
Radix UI                  →  Headless UI
@radix-ui/react-popover   →  @headlessui/react Popover
@radix-ui/react-tooltip   →  커스텀 Popover 또는 라이브러리
@radix-ui/react-hover-card →  커스텀 Popover
```
- **구현 우선순위**: 중간
- **사용처**: 알림, 도구팁, 유저 정보 카드
- **마이그레이션 노트**: Tooltip 전용 컴포넌트는 별도 필요

## 커스텀 구현이 필요한 컴포넌트

### 1. 스타일링 전용 컴포넌트 (Headless UI 불필요)
```
- @radix-ui/react-separator    →  순수 CSS/Tailwind
- @radix-ui/react-aspect-ratio →  CSS aspect-ratio 속성
- @radix-ui/react-progress     →  커스텀 div + CSS
- @radix-ui/react-avatar       →  커스텀 img + fallback 로직
- @radix-ui/react-slider       →  input[type=range] + 커스텀 스타일
- @radix-ui/react-scroll-area  →  CSS overflow + 커스텀 스크롤바
```

### 2. 복합 컴포넌트
```
- @radix-ui/react-navigation-menu →  Menu + Popover 조합
- @radix-ui/react-toast          →  별도 toast 라이브러리 (sonner 등)
- @radix-ui/react-toggle-group   →  RadioGroup 변형
- @radix-ui/react-toggle         →  커스텀 button + state
```

### 3. 특수 기능 컴포넌트
```
- @radix-ui/react-slot       →  React.cloneElement 기반 커스텀 구현
- @radix-ui/react-label      →  <label> 태그 + 연결 로직
- @radix-ui/react-checkbox   →  커스텀 구현 (접근성 고려)
```

## 마이그레이션 우선순위

### Phase 1: 핵심 인터랙션 컴포넌트 (1주차)
1. **Dialog** - 모달, 알럿 다이얼로그
2. **Menu** - 드롭다운, 컨텍스트 메뉴
3. **Popover** - 팝오버, 툴팁
4. **Switch** - 토글 스위치

### Phase 2: 폼 및 선택 컴포넌트 (2주차)
1. **Listbox** - Select 대체
2. **Combobox** - Command/Search 대체
3. **RadioGroup** - 라디오 버튼 그룹
4. **Tab** - 탭 컴포넌트

### Phase 3: 레이아웃 및 디스클로저 (3주차)
1. **Disclosure** - Accordion, Collapsible 대체
2. **커스텀 컴포넌트들** - Progress, Avatar, Slider 등

## 구현 전략

### 1. API 일관성 유지
```typescript
// 기존 Radix UI 패턴
<Dialog.Root>
  <Dialog.Trigger />
  <Dialog.Content />
</Dialog.Root>

// Headless UI 패턴으로 변경
<Dialog>
  <DialogButton />
  <DialogPanel />
</Dialog>
```

### 2. 컴포넌트 래핑 전략
```typescript
// Headless UI를 래핑하여 기존 API 유지
export const Dialog = {
  Root: HeadlessDialog,
  Trigger: DialogButton,
  Content: DialogPanel,
  // ... 기타 서브컴포넌트
}
```

### 3. 테마 시스템 통합
- 모든 컴포넌트에 터미널 테마 CSS 클래스 적용
- CSS custom properties 활용한 다크/라이트 모드 지원
- 기존 디자인 토큰과 완벽 호환

### 4. 접근성 고려사항
- Headless UI의 내장 접근성 기능 최대한 활용
- ARIA 레이블 및 키보드 네비게이션 테스트
- 스크린 리더 호환성 확인

### 5. 성능 최적화
- Tree-shaking 친화적인 개별 컴포넌트 export
- 불필요한 의존성 제거
- Lazy loading 적용 가능한 컴포넌트 식별

## 호환성 매트릭스

| Radix UI 컴포넌트 | Headless UI 대체 | 구현 난이도 | 기능 손실 |
| ----------------- | ---------------- | ----------- | --------- |
| Dialog            | Dialog           | 낮음        | 없음      |
| Dropdown Menu     | Menu             | 낮음        | 없음      |
| Popover           | Popover          | 낮음        | 없음      |
| Switch            | Switch           | 낮음        | 없음      |
| Tabs              | Tab              | 낮음        | 없음      |
| Select            | Listbox          | 중간        | 약간      |
| Accordion         | Disclosure       | 중간        | 약간      |
| Command           | Combobox         | 중간        | 없음      |
| Checkbox          | 커스텀           | 높음        | 없음      |
| Slider            | 커스텀           | 높음        | 약간      |
| Toast             | 외부 라이브러리  | 중간        | 없음      |

## 다음 단계
1. 핵심 컴포넌트부터 순차적 마이그레이션
2. 각 컴포넌트별 테스트 케이스 작성
3. 기존 프로토타입과의 기능 비교 검증
4. 성능 및 번들 사이즈 최적화