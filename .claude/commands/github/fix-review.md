---
description: CodeRabbit 리뷰 코멘트를 확인하고 필요한 것만 반영
allowed-tools: Bash(gh:*), Read, Write, Edit
---

# PR 리뷰 코멘트 처리

## 1. 현재 PR의 리뷰 코멘트 가져오기

<review_comments>
!gh pr view --json reviews,comments --jq '.reviews[].body, .comments[].body'
</review_comments>

<inline_comments>
!gh api graphql -f query='
  query {
    repository(owner: "{owner}", name: "{repo}") {
      pullRequest(number: {pr_number}) {
        reviewThreads(first: 100) {
          nodes {
            isResolved
            comments(first: 10) {
              nodes {
                body
                path
                line
              }
            }
          }
        }
      }
    }
  }
' 2>/dev/null || gh pr view --comments
</inline_comments>

## 2. 각 코멘트 분석 및 처리 기준

각 리뷰 코멘트를 아래 기준으로 분류해서 처리:

### 반드시 수정
- 버그 또는 잠재적 런타임 에러
- 보안 취약점
- 성능 문제 (N+1 쿼리, 메모리 누수 등)

### 수정 권장
- 코드 가독성 개선
- 중복 코드 제거
- 타입 안정성 향상

### 무시
- 단순 스타일/포맷팅 취향 차이
- 기존 코드베이스 컨벤션과 충돌하는 제안
- 이미 의도적으로 작성한 코드에 대한 불필요한 변경

## 3. 작업 방식

1. 먼저 모든 코멘트를 나열하고 각각 어떻게 처리할지 판단 결과를 보여줘
2. 수정이 필요한 항목만 실제로 코드 변경
3. 변경 후 무엇을 수정했는지 간단히 요약