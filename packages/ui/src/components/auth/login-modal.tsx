'use client';

import { Chrome, Github } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../primitives/dialog';
import { OAuthProvider } from '@imkdw-dev/consts';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSocialLogin: (provider: OAuthProvider) => void;
  translations: {
    title: string;
    loginWithGoogle: string;
    loginWithGithub: string;
    autoSignup: string;
  };
}

export function LoginModal({ isOpen, onClose, onSocialLogin, translations }: Props) {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="text-center">{translations.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
            onClick={() => onSocialLogin('google')}
          >
            <Chrome className="h-5 w-5" />
            <span>{translations.loginWithGoogle}</span>
          </Button>
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground"
            variant="outline"
            onClick={() => onSocialLogin('github')}
          >
            <Github className="h-5 w-5" />
            <span>{translations.loginWithGithub}</span>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">{translations.autoSignup}</div>
      </DialogContent>
    </Dialog>
  );
}
