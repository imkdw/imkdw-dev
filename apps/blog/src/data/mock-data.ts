export const recentArticles = [
  {
    title: 'React 18의 Concurrent Features 완전 정복',
    excerpt: 'React 18에서 새롭게 도입된 Concurrent Features를 활용해 더 나은 사용자 경험을 만드는 방법을 알아봅시다.',
    publishedAt: '2024년 12월 8일',
    readTime: '10분',
    tags: ['React', 'Performance', 'Frontend'],
    series: 'React 마스터하기',
    slug: 'react-18-concurrent-features',
    isBookmarked: false,
  },
  {
    title: 'Node.js와 TypeScript로 견고한 REST API 구축하기',
    excerpt:
      'Express.js와 TypeScript를 활용해 확장 가능하고 유지보수가 쉬운 REST API를 구축하는 방법을 단계별로 설명합니다.',
    publishedAt: '2024년 12월 5일',
    readTime: '15분',
    tags: ['Node.js', 'TypeScript', 'Backend'],
    series: '백엔드 개발 기초',
    slug: 'nodejs-typescript-rest-api',
    isBookmarked: true,
  },
  {
    title: 'CSS Grid vs Flexbox: 언제 무엇을 써야 할까?',
    excerpt:
      'CSS Grid와 Flexbox의 차이점을 이해하고, 각각의 장단점과 적절한 사용 시나리오를 실제 예제와 함께 알아보겠습니다.',
    publishedAt: '2024년 12월 3일',
    readTime: '8분',
    tags: ['CSS', 'Layout', 'Frontend'],
    slug: 'css-grid-vs-flexbox',
    isBookmarked: false,
  },
  {
    title: 'JavaScript 비동기 프로그래밍: Promise부터 async/await까지',
    excerpt:
      'JavaScript의 비동기 처리를 깊이 있게 이해하고, Promise, async/await, 그리고 최신 패턴들을 마스터해보세요.',
    publishedAt: '2024년 12월 1일',
    readTime: '12분',
    tags: ['JavaScript', 'Async', 'Programming'],
    slug: 'javascript-async-programming',
    isBookmarked: false,
  },
];

export const recentSeries = [
  {
    title: 'React 마스터하기',
    description: 'React의 기초부터 고급 패턴까지, 실무에서 바로 활용할 수 있는 React 개발 가이드',
    articleCount: 12,
    totalReadTime: '4시간 30분',
    lastUpdated: '2024년 12월 8일',
    tags: ['React', 'Frontend', 'JavaScript'],
    slug: 'react-mastery',
    status: 'active' as const,
  },
  {
    title: '백엔드 개발 기초',
    description: 'Node.js와 TypeScript를 활용한 현대적인 백엔드 개발 방법론과 베스트 프랙티스',
    articleCount: 8,
    totalReadTime: '3시간 15분',
    lastUpdated: '2024년 12월 5일',
    tags: ['Node.js', 'TypeScript', 'Backend'],
    slug: 'backend-fundamentals',
    status: 'active' as const,
  },
];

export const blogStats = [
  { label: '총 게시글', value: '127', color: 'text-primary' },
  { label: '진행 시리즈', value: '15', color: 'text-accent' },
  { label: '총 조회수', value: '45.2k', color: 'text-green-500' },
  { label: '기술 태그', value: '32', color: 'text-accent' },
];

export const terminalCommands = [
  { command: 'git clone https://github.com/imkdw/imkdw-dev.git' },
  { command: 'cd imkdw-dev && pnpm install' },
  { command: 'pnpm dev' },
  { command: 'echo "Welcome to my blog!"' },
];