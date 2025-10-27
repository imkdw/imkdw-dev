'use client';

import { Edit, LogOut, User } from 'lucide-react';
import { Button, buttonVariants } from '../../primitives/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../primitives/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { MEMBER_ROLE } from '@imkdw-dev/consts';
import Link from 'next/link';
import { cn } from '../../lib/utils';
import { useRouter } from 'next/navigation';
import { useAuth } from '@imkdw-dev/auth';

interface Props {
  onLogin: () => void;
  onLogout?: () => Promise<void>;
}

export function MemberMenu({ onLogin, onLogout }: Props) {
  const router = useRouter();
  const { member, logout } = useAuth();

  if (!member) {
    return <Button onClick={onLogin}>로그인</Button>;
  }

  const handleLogout = async () => {
    if (onLogout) {
      await onLogout();
    }

    logout();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: 'ghost' }), 'relative h-8 w-8 rounded-full')}>
        <Avatar className="h-8 w-8">
          <AvatarImage src={member.profileImage} alt={member.email} />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {member.email.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{member.nickname}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{member.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/members/${member.id}`} className="flex items-center justify-center">
            <User className="mr-2 h-4 w-4" />
            <span>마이페이지</span>
          </Link>
        </DropdownMenuItem>
        {member.role === MEMBER_ROLE.ADMIN && (
          <DropdownMenuItem>
            <Link href={`/articles/create`} className="flex items-center justify-center">
              <Edit className="mr-2 h-4 w-4" />
              <span>글 작성</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="cursor-pointer" onClick={handleLogout}>
            로그아웃
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
