'use client';

import { useState } from 'react';
import { Github, Chrome } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../primitives/dialog';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: any) => void;
}

export function LoginModal({ isOpen, onClose, onLoginSuccess }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSocialLogin = async (provider: 'github' | 'google') => {
    setIsLoading(true);

    // 임시 사용자 데이터 (실제로는 API에서 가져옴)
    const mockUsers = {
      github: {
        id: '1',
        name: 'GitHub 개발자',
        email: 'developer@github.com',
        avatar: 'https://github.com/github.png',
      },
      google: {
        id: '2',
        name: 'Google 사용자',
        email: 'user@gmail.com',
        avatar: 'https://lh3.googleusercontent.com/a/default-user',
      },
    };

    // 임시 지연으로 로딩 상태 시뮬레이션
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(mockUsers[provider]);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="text-center">로그인</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={() => handleSocialLogin('github')}
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
          >
            <Github className="h-5 w-5" />
            <span>GitHub로 로그인</span>
          </Button>

          <Button
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading}
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
          >
            <Chrome className="h-5 w-5" />
            <span>Google로 로그인</span>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">계정이 없으시면 자동으로 회원가입됩니다</div>
      </DialogContent>
    </Dialog>
  );
}