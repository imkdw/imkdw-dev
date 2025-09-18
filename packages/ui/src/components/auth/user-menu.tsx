import { User, Edit, LogOut } from 'lucide-react';
import { Button } from '../../primitives/button';
import { Avatar, AvatarImage, AvatarFallback } from '../../primitives/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../primitives/dropdown-menu';
import { IMemberDto } from '@imkdw-dev/types';
import Link from 'next/link';

interface Props {
  currentMember: IMemberDto | null;
  onLogin: () => void;
  onLogout: () => void;
}

export function UserMenu({ currentMember: user, onLogin, onLogout }: Props) {
  if (!user) {
    return <Button onClick={onLogin}>로그인</Button>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.profileImage} alt={user.email} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-none" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium">{user.nickname}</p>
            <p className="w-[200px] truncate text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={`/users/${user.id}`} className="flex items-center justify-center">
            <User className="mr-2 h-4 w-4" />
            <span>마이페이지</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={`/articles/new`} className="flex items-center justify-center">
            <Edit className="mr-2 h-4 w-4" />
            <span>글 작성</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span className="cursor-pointer" onClick={onLogout}>
            로그아웃
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
