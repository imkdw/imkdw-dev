import { useState, useEffect } from 'react';
import { Terminal, ChevronRight } from 'lucide-react';

const DevTerminalSection = () => {
  const [currentCommand, setCurrentCommand] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  const commands = [
    'git clone https://github.com/devblog/articles.git',
    'cd articles && npm install',
    'npm run dev',
    'echo "Welcome to DevBlog! 🚀"'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let commandIndex = 0;
    let charIndex = 0;
    
    const typeCommand = () => {
      if (commandIndex < commands.length) {
        const command = commands[commandIndex];
        if (charIndex < command.length) {
          setCurrentCommand(command.slice(0, charIndex + 1));
          charIndex++;
          setTimeout(typeCommand, 50);
        } else {
          setTimeout(() => {
            commandIndex++;
            charIndex = 0;
            if (commandIndex < commands.length) {
              setCurrentCommand('');
              setTimeout(typeCommand, 500);
            }
          }, 2000);
        }
      } else {
        // Reset animation
        setTimeout(() => {
          commandIndex = 0;
          charIndex = 0;
          setCurrentCommand('');
          setTimeout(typeCommand, 1000);
        }, 3000);
      }
    };

    setTimeout(typeCommand, 1000);
  }, []);

  const stats = [
    { label: 'Total Articles', value: '127', color: 'text-primary' },
    { label: 'Active Series', value: '15', color: 'text-accent' },
    { label: 'Total Views', value: '45.2k', color: 'text-terminal-success' },
    { label: 'Tech Tags', value: '32', color: 'text-accent' }
  ];

  return (
    <section className="py-4 md:py-6 lg:py-8 bg-muted/20 border-b border-border">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 lg:gap-8 items-stretch">
        {/* Terminal Window */}
        <div className="terminal-window terminal-glow h-full flex flex-col min-h-[300px] md:min-h-[350px]">
          <div className="terminal-header">
            <div className="flex items-center space-x-2">
              <div className="window-controls">
                <div className="control-dot close"></div>
                <div className="control-dot minimize"></div>
                <div className="control-dot maximize"></div>
              </div>
              <div className="flex items-center space-x-2">
                <Terminal className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                <span className="text-xs md:text-sm font-mono">devblog - zsh</span>
              </div>
            </div>
          </div>
          
          <div className="terminal-content flex-1 flex flex-col justify-center p-3 md:p-4">
            <div className="space-y-2">
              <div className="terminal-prompt">
                <span className="prompt-symbol">→</span>
                <span className="prompt-path text-xs md:text-sm">~/devblog</span>
                <span className="text-muted-foreground text-xs md:text-sm">(main)</span>
                <span className="prompt-symbol">$</span>
              </div>
              
              <div className="flex items-center">
                <span className="text-primary mr-2 text-xs md:text-sm">$</span>
                <span className="font-mono text-xs md:text-sm">
                  {currentCommand}
                  {showCursor && <span className="bg-primary text-primary-foreground px-1">_</span>}
                </span>
              </div>
              
              <div className="text-primary/80 text-xs md:text-sm space-y-1">
                <div>Cloning into 'articles'...</div>
                <div className="hidden sm:block">remote: Enumerating objects: 1247, done.</div>
                <div className="hidden sm:block">Receiving objects: 100% (1247/1247), 2.1 MiB | 850.00 KiB/s, done.</div>
                <div className="text-terminal-warning">✨ Ready to code!</div>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Info */}
        <div className="space-y-4 md:space-y-6 h-full flex flex-col justify-center">
          <div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 md:mb-3">
              <span className="syntax-keyword">const</span>{' '}
              <span className="text-primary">DevBlog</span>{' '}
              <span className="text-muted-foreground">=</span>{' '}
              <span className="syntax-string">"개발자를 위한 공간"</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              최신 웹 기술, 프로그래밍 튜토리얼, 그리고 실무에서 바로 활용할 수 있는 
              코드 예제들을 제공합니다. 함께 성장하는 개발자 커뮤니티를 만들어가요.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-2 md:gap-3 lg:gap-4">
            {stats.map((stat, index) => (
              <div key={stat.label} className="p-2 md:p-3 lg:p-4 rounded-lg bg-muted/30 border border-border/50">
                <div className={`text-base md:text-lg lg:text-2xl font-bold font-mono ${stat.color} mb-1`}>
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-1 md:gap-2">
            {['React', 'TypeScript', 'Node.js', 'Frontend', 'Backend'].map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 md:px-3 py-1 rounded-full bg-primary/10 text-primary text-xs md:text-sm font-mono border border-primary/20 hover:bg-primary/20 cursor-pointer smooth-transition"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevTerminalSection;