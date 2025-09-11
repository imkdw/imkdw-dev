# UI 컴포넌트 마이그레이션 계획 (세분화)

## 📋 개요
기존 UI 프로토타입 51개 컴포넌트를 packages/ui로 1개씩 단계별 마이그레이션
각 Phase는 1개 컴포넌트 = 1일 작업량으로 구성

## 🎯 작업 원칙
- 1 Phase = 1 Component 
- Headless UI 기반 재구축
- 라이트/다크 테마 동시 지원
- /design 경로에서 실시간 컴포넌트 확인 가능
- 불필요한 코드는 일절 작성하지 않고 YANGI 원칙을 따릅니다. 정말 필요한 코드만 그때그때 작성합니다
- 계획을 세울때는 항상 한글로 세워주세요

## 테스트 
1. `pnpm blog dev` 개발 서버 시작
2. `http://localhost:3000/design` 페이지 접속
3. 테마 토글 버튼 클릭 테스트 (🌙 다크 ↔ 🌞 라이트)
4. 모든 Button variants 클릭 테스트 (Primary, Secondary, Destructive, Outline, Ghost, Terminal)
5. 모든 크기 버튼 클릭 테스트 (xs, sm, md, lg, xl, icon)
6. 로딩 상태 및 disabled 상태 확인
7. 전체 페이지 스크린샷 촬영 (라이트/다크 테마 각각)
8. 터미널 스타일 버튼 상호작용 확인

---

## 진행 상황 체크리스트

### 기초 설정
- [x] **Phase 1: 디자인 토큰 시스템 구축**
  - [x] 화이트테마 색상 체계 완성
  - [x] 터미널 특화 토큰 추가
  - [x] Tailwind 프리셋 업데이트

### 기본 컴포넌트 (Phase 2-16)
- [x] **Phase 2: Button 컴포넌트**
  - 마이그레이션: `ui/button.tsx` → `primitives/button/`
  - 특징: CVA 패턴, 로딩 상태, 터미널 테마 variants
  - 추가 완료: xs, xl 크기 variants, 디자인 시스템 쇼케이스 (/design)

- [x] **Phase 3: Input 컴포넌트**
  - 마이그레이션: `ui/input.tsx` → `primitives/input/`
  - 특징: CVA 패턴, 포커스 스타일, 에러/성공 상태, 터미널 테마, 다양한 크기

- [x] **Phase 4: Card 컴포넌트**
- 마이그레이션: `ui/card.tsx` → `primitives/card/`
- 특징: 헤더/바디/푸터 구조, 그라데이션 지원, CVA 패턴, 터미널 테마

- [x] **Phase 5: Badge 컴포넌트**
  - 마이그레이션: `ui/badge.tsx` → `primitives/badge/`
  - 특징: 상태별 색상, 크기 variants, CVA 패턴, 터미널 테마, 모양 variants

- [ ] **Phase 6: Label 컴포넌트**
  - 마이그레이션: `ui/label.tsx` → `primitives/label/`
  - 특징: 폼 연동, 접근성 지원

- [ ] **Phase 7: Textarea 컴포넌트**
  - 마이그레이션: `ui/textarea.tsx` → `primitives/textarea/`
  - 특징: 리사이즈 옵션, 글자수 제한

- [ ] **Phase 8: Select 컴포넌트**
  - 마이그레이션: `ui/select.tsx` → `primitives/select/`
  - 특징: Headless UI Listbox 기반

- [ ] **Phase 9: Checkbox 컴포넌트**
  - 마이그레이션: `ui/checkbox.tsx` → `primitives/checkbox/`
  - 특징: 중간 상태 지원, 커스텀 아이콘

- [ ] **Phase 10: RadioGroup 컴포넌트**
  - 마이그레이션: `ui/radio-group.tsx` → `primitives/radio-group/`
  - 특징: Headless UI RadioGroup 기반

- [ ] **Phase 11: Switch 컴포넌트**
  - 마이그레이션: `ui/switch.tsx` → `primitives/switch/`
  - 특징: Headless UI Switch 기반, 애니메이션

- [ ] **Phase 12: Slider 컴포넌트**
  - 마이그레이션: `ui/slider.tsx` → `primitives/slider/`
  - 특징: 범위 선택, 단계별 이동

- [ ] **Phase 13: Progress 컴포넌트**
  - 마이그레이션: `ui/progress.tsx` → `primitives/progress/`
  - 특징: 터미널 스타일, 애니메이션

- [ ] **Phase 14: Avatar 컴포넌트**
  - 마이그레이션: `ui/avatar.tsx` → `primitives/avatar/`
  - 특징: 이미지 로딩, 폴백 지원

- [ ] **Phase 15: Separator 컴포넌트**
  - 마이그레이션: `ui/separator.tsx` → `primitives/separator/`
  - 특징: 수직/수평 방향, 다양한 스타일

- [ ] **Phase 16: Alert 컴포넌트**
  - 마이그레이션: `ui/alert.tsx` → `primitives/alert/`
  - 특징: 상태별 아이콘, 닫기 기능

### 오버레이 컴포넌트 (Phase 17-24)
- [ ] **Phase 17: Tooltip 컴포넌트**
  - 마이그레이션: `ui/tooltip.tsx` → `primitives/tooltip/`
  - 특징: Headless UI 기반, 포지셔닝

- [ ] **Phase 18: Popover 컴포넌트**
  - 마이그레이션: `ui/popover.tsx` → `primitives/popover/`
  - 특징: Headless UI Popover 기반

- [ ] **Phase 19: Dialog 컴포넌트**
  - 마이그레이션: `ui/dialog.tsx` → `primitives/dialog/`
  - 특징: Headless UI Dialog 기반, 모달

- [ ] **Phase 20: DropdownMenu 컴포넌트**
  - 마이그레이션: `ui/dropdown-menu.tsx` → `primitives/dropdown-menu/`
  - 특징: Headless UI Menu 기반

- [ ] **Phase 21: HoverCard 컴포넌트**
  - 마이그레이션: `ui/hover-card.tsx` → `primitives/hover-card/`
  - 특징: 호버 시 표시, 지연 시간 설정

- [ ] **Phase 22: ContextMenu 컴포넌트**
  - 마이그레이션: `ui/context-menu.tsx` → `primitives/context-menu/`
  - 특징: 우클릭 메뉴, 키보드 네비게이션

- [ ] **Phase 23: Sheet 컴포넌트**
  - 마이그레이션: `ui/sheet.tsx` → `primitives/sheet/`
  - 특징: 슬라이드 인 패널, 방향 설정

- [ ] **Phase 24: Drawer 컴포넌트**
  - 마이그레이션: `ui/drawer.tsx` → `primitives/drawer/`
  - 특징: 모바일 친화적 드로어

### 인터랙티브 컴포넌트 (Phase 25-28)
- [ ] **Phase 25: Accordion 컴포넌트**
  - 마이그레이션: `ui/accordion.tsx` → `primitives/accordion/`
  - 특징: Headless UI Disclosure 기반

- [ ] **Phase 26: Tabs 컴포넌트**
  - 마이그레이션: `ui/tabs.tsx` → `primitives/tabs/`
  - 특징: Headless UI Tab 기반

- [ ] **Phase 27: Collapsible 컴포넌트**
  - 마이그레이션: `ui/collapsible.tsx` → `primitives/collapsible/`
  - 특징: 접기/펼치기 애니메이션

- [ ] **Phase 28: MenuBar 컴포넌트**
  - 마이그레이션: `ui/menubar.tsx` → `primitives/menubar/`
  - 특징: 데스크톱 스타일 메뉴바

### 네비게이션 컴포넌트 (Phase 29-31)
- [ ] **Phase 29: NavigationMenu 컴포넌트**
  - 마이그레이션: `ui/navigation-menu.tsx` → `primitives/navigation-menu/`
  - 특징: 메가 메뉴, 호버 효과

- [ ] **Phase 30: Breadcrumb 컴포넌트**
  - 마이그레이션: `ui/breadcrumb.tsx` → `primitives/breadcrumb/`
  - 특징: 네비게이션 경로 표시

- [ ] **Phase 31: Pagination 컴포넌트**
  - 마이그레이션: `ui/pagination.tsx` → `primitives/pagination/`
  - 특징: 페이지 네비게이션, 생략 표시

### 레이아웃 컴포넌트 (Phase 32-34)
- [ ] **Phase 32: ScrollArea 컴포넌트**
  - 마이그레이션: `ui/scroll-area.tsx` → `primitives/scroll-area/`
  - 특징: 커스텀 스크롤바

- [ ] **Phase 33: Resizable 컴포넌트**
  - 마이그레이션: `ui/resizable.tsx` → `primitives/resizable/`
  - 특징: 패널 크기 조절

- [ ] **Phase 34: Table 컴포넌트**
  - 마이그레이션: `ui/table.tsx` → `primitives/table/`
  - 특징: 정렬, 필터링 지원

### 날짜/시간 컴포넌트 (Phase 35-36)
- [ ] **Phase 35: Calendar 컴포넌트**
  - 마이그레이션: `ui/calendar.tsx` → `primitives/calendar/`
  - 특징: 날짜 선택, 범위 선택

- [ ] **Phase 36: DatePicker 컴포넌트**
  - 마이그레이션: `ui/date-picker.tsx` → `primitives/date-picker/`
  - 특징: Calendar + Input 조합

### 복합 컴포넌트 (Phase 37-44)
- [ ] **Phase 37: Form 컴포넌트**
  - 마이그레이션: `ui/form.tsx` → `primitives/form/`
  - 특징: react-hook-form 연동

- [ ] **Phase 38: Command 컴포넌트**
  - 마이그레이션: `ui/command.tsx` → `primitives/command/`
  - 특징: 터미널 스타일 명령어 팔레트

- [ ] **Phase 39: Combobox 컴포넌트**
  - 마이그레이션: `ui/combobox.tsx` → `primitives/combobox/`
  - 특징: 검색 가능한 드롭다운

- [ ] **Phase 40: InputOTP 컴포넌트**
  - 마이그레이션: `ui/input-otp.tsx` → `primitives/input-otp/`
  - 특징: OTP 코드 입력

- [ ] **Phase 41: AspectRatio 컴포넌트**
  - 마이그레이션: `ui/aspect-ratio.tsx` → `primitives/aspect-ratio/`
  - 특징: 비율 유지 컨테이너

- [ ] **Phase 42: Skeleton 컴포넌트**
  - 마이그레이션: `ui/skeleton.tsx` → `primitives/skeleton/`
  - 특징: 로딩 스켈레톤

- [ ] **Phase 43: Sonner (Toast) 컴포넌트**
  - 마이그레이션: `ui/sonner.tsx` → `primitives/toast/`
  - 특징: 알림 토스트

- [ ] **Phase 44: Chart 컴포넌트**
  - 마이그레이션: `ui/chart.tsx` → `primitives/chart/`
  - 특징: 데이터 시각화

### 테마 시스템 (Phase 45)
- [ ] **Phase 45: ThemeProvider 컴포넌트**
  - 작업 내용: next-themes 기반 테마 전환 시스템

### 터미널 특화 컴포넌트 (Phase 46)
- [ ] **Phase 46-1: Terminal 컴포넌트**
  - 새로 구축: 터미널 시뮬레이터

- [ ] **Phase 46-2: CodeBlock 컴포넌트**
  - 새로 구축: 구문 강조 코드 블록

- [ ] **Phase 46-3: WindowControls 컴포넌트**
  - 새로 구축: macOS 스타일 윈도우 컨트롤

- [ ] **Phase 46-4: StatusIndicator 컴포넌트**
  - 새로 구축: 터미널 상태 표시

### 컴포넌트 갤러리 (Phase 47)
- [x] **Phase 47: 컴포넌트 갤러리 페이지** (Phase 2에서 기초 구축 완료)
  - [x] `/design` 경로 설정
  - [x] 다크/라이트 테마 토글
  - [x] 컴포넌트별 props 및 variants 표시
  - [ ] 모든 컴포넌트 나열 및 프리뷰 (Phase별로 점진적 추가)
  - [ ] 실시간 코드 예제

**갤러리 구조**:
```
/design
├── overview (전체 컴포넌트 목록)
├── primitives (기본 컴포넌트) ✅ Button 완료
├── layouts (레이아웃 컴포넌트)  
├── terminal (터미널 특화)
└── tokens (디자인 토큰) ✅ 기초 완료
```

## 🧪 표준 테스트 프로세스 (Playwright MCP)

각 Phase 완료 후 다음 테스트를 수행:

### 1. 기본 테스트
```bash
pnpm blog dev  # 개발 서버 시작
```
- `/design` 페이지 접속 확인
- 새로운 컴포넌트 렌더링 확인
- 테마 토글 기능 정상 작동 확인

### 2. 컴포넌트별 상호작용 테스트
- 모든 variants 클릭/hover 테스트
- 모든 크기 옵션 확인
- disabled, loading 등 상태 확인
- props 변경 시 UI 변화 확인

### 3. 문서화
- 라이트 테마 전체 페이지 스크린샷 촬영
- 다크 테마 전체 페이지 스크린샷 촬영
- 주요 상호작용 장면 캡처

### 4. 접근성 및 반응형 테스트
- 키보드 네비게이션 확인
- 화면 크기 변경 시 레이아웃 확인
- 색상 대비 및 가독성 확인

---

## ⏱ 예상 일정
- **총 소요 기간**: 47일 (약 2개월)
- **주요 컴포넌트 완성**: Phase 20 (3주차)
- **전체 시스템 완성**: Phase 47 (7주차)

## 📈 진행률 체크포인트
- **1주차**: Phase 1-7 (기본 입력 컴포넌트) - [ ] 완료
- **2주차**: Phase 8-14 (폼 관련 컴포넌트) - [ ] 완료
- **3주차**: Phase 15-21 (피드백 컴포넌트) - [ ] 완료
- **4주차**: Phase 22-28 (오버레이 컴포넌트) - [ ] 완료
- **5주차**: Phase 29-35 (네비게이션 컴포넌트) - [ ] 완료
- **6주차**: Phase 36-42 (복합 컴포넌트) - [ ] 완료
- **7주차**: Phase 43-47 (특화 컴포넌트 + 갤러리) - [ ] 완료

---

## 📊 전체 진행률
완료된 Phase: 5 / 47 (11%)

**업데이트 방법**: 각 Phase 완료 시 해당 체크박스를 [x]로 변경하고 전체 진행률을 업데이트하세요.