'use client';

import { Chrome } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../primitives/dialog';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess?: (userData: User) => void;
}

export function LoginModal({ isOpen, onClose }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="text-center">로그인</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
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
