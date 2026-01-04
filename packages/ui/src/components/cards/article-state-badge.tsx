'use client';

import { EyeOff } from 'lucide-react';
import { useAuth } from '@imkdw-dev/auth';
import { MEMBER_ROLE, ARTICLE_STATE } from '@imkdw-dev/consts';

interface Props {
  state: string;
}

export function ArticleStateBadge({ state }: Props) {
  const { member } = useAuth();

  const isAdmin = member?.role === MEMBER_ROLE.ADMIN;
  const isHidden = state === ARTICLE_STATE.HIDDEN;

  if (!isAdmin || !isHidden) {
    return null;
  }

  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-[0_0_8px_rgba(251,191,36,0.15)]">
      <EyeOff className="h-3.5 w-3.5" />
      비공개
    </span>
  );
}
