'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Terminal as TerminalIcon, Minimize2, Maximize2, X } from 'lucide-react';
import { Button } from '@imkdw-dev/ui';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface TerminalCommand {
  command: string;
  output: string[];
  timestamp: string;
}

export default function Terminal() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = {
    help: {
      description: '사용 가능한 명령어 목록을 표시합니다',
      execute: () => [
        '사용 가능한 명령어:',
        '',
        '  help           - 이 도움말을 표시',
        '  clear          - 터미널 화면을 지웁니다',
        '  articles       - 최근 게시글 목록',
        '  series         - 시리즈 목록',
        '  stats          - 블로그 통계',
        '  search <term>  - 게시글 검색',
        '  whoami         - 현재 사용자 정보',
        '  date           - 현재 날짜와 시간',
        '  joke           - 개발자 농담',
        '  matrix         - 매트릭스 효과 (재미용)',
        '  weather        - 오늘 날씨 (가상)',
        '  fortune        - 개발자를 위한 조언',
        '',
        '팁: 위/아래 화살표로 명령어 히스토리를 탐색할 수 있습니다.',
      ],
    },
    clear: {
      description: '터미널 화면을 지웁니다',
      execute: () => {
        setHistory([]);
        return [];
      },
    },
    articles: {
      description: '최근 게시글 목록을 표시합니다',
      execute: () => [
        '최근 게시글 목록:',
        '',
        '  1. React 18의 Concurrent Features 완전 정복',
        '  2. Node.js와 TypeScript로 견고한 REST API 구축하기',
        '  3. CSS Grid vs Flexbox: 언제 무엇을 써야 할까?',
        '  4. JavaScript 비동기 프로그래밍: Promise부터 async/await까지',
        '  5. 웹 성능 최적화를 위한 10가지 팁',
        '',
        '더 많은 글을 보려면: cd /articles',
      ],
    },
    series: {
      description: '시리즈 목록을 표시합니다',
      execute: () => [
        '진행중인 시리즈:',
        '',
        '  📚 React 마스터하기 (12/15 완료)',
        '  🔧 백엔드 개발 기초 (8/10 완료)',
        '  🎨 CSS 디자인 패턴 (5/8 완료)',
        '  ⚡ 웹 성능 최적화 (3/6 완료)',
        '',
        '완료된 시리즈: 2개',
      ],
    },
    stats: {
      description: '블로그 통계를 표시합니다',
      execute: () => [
        '📊 블로그 통계',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '  총 게시글:        127개',
        '  총 시리즈:        15개',
        '  총 조회수:        45,892회',
        '  이번 달 방문자:   3,247명',
        '  평균 읽기 시간:   8분 32초',
        '  가장 인기 태그:   React, TypeScript, JavaScript',
        '',
        '  📈 이번 주 성장률: +12.5%',
        '  🔥 인기 글: "React 18의 Concurrent Features"',
      ],
    },
    whoami: {
      description: '현재 사용자 정보를 표시합니다',
      execute: () => [
        '현재 사용자: 개발자',
        '권한: 블로그 관리자',
        '마지막 로그인: 방금 전',
        '활동 상태: 온라인',
        '',
        '🚀 오늘도 좋은 코딩 되세요!',
      ],
    },
    date: {
      description: '현재 날짜와 시간을 표시합니다',
      execute: () => [
        new Date().toLocaleString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          weekday: 'long',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
      ],
    },
    joke: {
      description: '개발자 농담을 표시합니다',
      execute: () => {
        const jokes = [
          '왜 개발자는 밤늦게 일할까요? 버그들이 밤에 더 활발하게 움직이거든요! 🐛',
          'JavaScript를 배우는 것은 마치... 사실 아무것도 마치지 않아요. === vs ==',
          '99개의 작은 버그가 코드에 있네~ 99개의 작은 버그~ 하나를 고치고 패치를 했더니... 117개의 작은 버그가 코드에 있네~',
          '개발자의 가장 무서운 순간: "어? 이거 왜 되지?" 😱',
          '"잠깐, 왜 이게 되는거지?" - 모든 개발자가 한 번은 해봤을 말',
          'CSS를 중앙 정렬하는 방법이 몇 가지 있나요? 네, 모르겠습니다. 저도 구글링해요.',
        ];
        return [jokes[Math.floor(Math.random() * jokes.length)]];
      },
    },
    matrix: {
      description: '매트릭스 효과를 실행합니다',
      execute: () => [
        '매트릭스 모드 활성화...',
        '',
        '01001000 01100101 01101100 01101100 01101111',
        '01010111 01101111 01110010 01101100 01100100',
        '',
        '🔴 빨간 알약을 선택하셨군요... 현실로 돌아가는 중...',
        '',
        '환영합니다, Neo. 터미널의 세계에 오신 것을 환영합니다.',
      ],
    },
    weather: {
      description: '가상 날씨 정보를 표시합니다',
      execute: () => [
        '🌤️  서울 날씨 정보',
        '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
        '',
        '  현재 온도:     22°C',
        '  체감 온도:     24°C',
        '  습도:         65%',
        '  바람:         남서풍 3m/s',
        '  날씨:         맑음',
        '',
        '💡 코딩하기 좋은 날씨네요!',
      ],
    },
    fortune: {
      description: '개발자를 위한 조언을 제공합니다',
      execute: () => {
        const fortunes = [
          '오늘의 조언: 코드를 작성하기 전에 충분히 생각하세요. 하지만 너무 오래 생각하지는 마세요.',
          '버그는 문제가 아닙니다. 해결할 기회일 뿐입니다. 🐛➡️✨',
          '완벽한 코드는 없습니다. 하지만 더 나은 코드는 항상 있습니다.',
          '디버깅은 탐정 소설을 읽는 것과 같습니다. 범인은 항상 당신입니다.',
          '좋은 개발자는 코드를 작성하는 사람이 아니라, 문제를 해결하는 사람입니다.',
          '스택 오버플로우는 개발자의 가장 친한 친구입니다. 부끄러워하지 마세요.',
          '에러 메시지를 읽으세요. 정말로, 읽으세요. 답이 거기 있을지도 모릅니다.',
        ];
        return ['🔮 개발자를 위한 오늘의 조언:', '', fortunes[Math.floor(Math.random() * fortunes.length)]];
      },
    },
  };

  useEffect(() => {
    // 터미널 시작 메시지
    setHistory([
      {
        command: '',
        output: [
          '@imkdw-dev/blog Terminal v1.0.0',
          '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
          '',
          '환영합니다! 이 터미널에서 블로그를 탐색할 수 있습니다.',
          '"help"를 입력하여 사용 가능한 명령어를 확인하세요.',
          '',
        ],
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim();
    const [baseCommand, ...args] = trimmedCmd.split(' ');

    let output: string[] = [];

    if (trimmedCmd === '') {
      output = [''];
    } else if (baseCommand === 'search') {
      if (args.length === 0) {
        output = ['사용법: search <검색어>'];
      } else {
        const searchTerm = args.join(' ');
        output = [
          `"${searchTerm}"에 대한 검색 결과:`,
          '',
          '  1. React Hooks 완전 정복 - useState, useEffect 마스터하기',
          '  2. TypeScript로 타입 안전한 React 컴포넌트 만들기',
          '  3. 모던 JavaScript ES6+ 문법 총정리',
          '',
          '검색 결과: 3개의 글을 찾았습니다.',
        ];
      }
    } else if (baseCommand && Object.prototype.hasOwnProperty.call(commands, baseCommand)) {
      const result = commands[baseCommand as keyof typeof commands].execute();
      output = Array.isArray(result) ? result.filter((line): line is string => typeof line === 'string') : [];
    } else {
      output = [`명령어를 찾을 수 없습니다: ${baseCommand}`, '"help"를 입력하여 사용 가능한 명령어를 확인하세요.'];
    }

    if (baseCommand !== 'clear') {
      setHistory(prev => [
        ...prev,
        {
          command: trimmedCmd,
          output,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }

    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const commandHistory = history.filter(h => h.command !== '').map(h => h.command);
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex] ?? '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const commandHistory = history.filter(h => h.command !== '').map(h => h.command);
      if (historyIndex !== -1) {
        const newIndex = Math.min(commandHistory.length - 1, historyIndex + 1);
        if (newIndex === commandHistory.length - 1 && historyIndex === newIndex) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex] ?? '');
        }
      }
    }
  };

  return (
    <div className={`${isFullscreen ? 'fixed inset-4 z-50' : 'container mx-auto px-2 py-2 md:px-4 md:py-8'}`}>
      <div
        className={`bg-black text-green-400 text-sm ${
          isFullscreen ? 'h-full' : 'h-[calc(100vh-2rem)] md:h-[600px]'
        } rounded-lg border border-green-400/30 shadow-2xl overflow-hidden flex flex-col ${jetBrainsMono.className}`}
      >
        {/* 터미널 헤더 */}
        <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-green-400/30 flex-shrink-0">
          <div className="flex items-center space-x-2">
            <TerminalIcon className="h-4 w-4 text-green-400" />
            <span className="text-green-400 text-xs">@imkdw-dev/blog Terminal</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setIsFullscreen(!isFullscreen);
                setTimeout(() => inputRef.current?.focus(), 0);
              }}
              className="h-8 w-8 p-0 text-green-400 hover:bg-green-400/20"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="h-8 w-8 p-0 text-green-400 hover:bg-green-400/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* 터미널 내용 */}
        <div
          ref={terminalRef}
          className="p-4 flex-1 overflow-y-auto space-y-2"
          onClick={() => inputRef.current?.focus()}
        >
          {/* 히스토리 */}
          {history.map((entry, index) => (
            <div key={index} className="space-y-1">
              {entry.command && (
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400">anonymous@imkdw-dev/blog:~$</span>
                  <span className="text-white">{entry.command}</span>
                </div>
              )}
              {entry.output.map((line, lineIndex) => (
                <div key={lineIndex} className={line.startsWith('  ') ? 'pl-4' : ''}>
                  {line}
                </div>
              ))}
            </div>
          ))}

          {/* 현재 입력 라인 */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-400">anonymous@imkdw-dev/blog:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none"
              placeholder="명령어를 입력하세요..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
