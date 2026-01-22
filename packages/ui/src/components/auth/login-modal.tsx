'use client';

import { useState } from 'react';
import { Chrome, Github, Loader2 } from 'lucide-react';
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
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);

  function handleSocialLogin(provider: OAuthProvider) {
    setLoadingProvider(provider);
    onSocialLogin(provider);
  }

  const isGoogleLoading = loadingProvider === 'google';
  const isGithubLoading = loadingProvider === 'github';

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogContent className="w-[90vw] max-w-md mx-auto" onClose={onClose}>
        <DialogHeader>
          <DialogTitle className="text-center">{translations.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
            variant="outline"
            onClick={() => handleSocialLogin('google')}
            disabled={loadingProvider !== null}
          >
            {isGoogleLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Chrome className="h-5 w-5" />}
            <span>{isGoogleLoading ? '...' : translations.loginWithGoogle}</span>
          </Button>
          <Button
            className="w-full h-12 flex items-center justify-center space-x-2 bg-background border border-border hover:bg-muted text-foreground disabled:opacity-60 disabled:cursor-not-allowed"
            variant="outline"
            onClick={() => handleSocialLogin('github')}
            disabled={loadingProvider !== null}
          >
            {isGithubLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Github className="h-5 w-5" />}
            <span>{isGithubLoading ? '...' : translations.loginWithGithub}</span>
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">{translations.autoSignup}</div>
      </DialogContent>
    </Dialog>
  );
}
