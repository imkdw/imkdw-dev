import { Code2, Github, Mail } from 'lucide-react';
import Link from 'next/link';

interface Props {
  className?: string;
}

export function FooterBrand({ className }: Props) {
  return (
    <div className={className}>
      <div className="flex items-center space-x-2 mb-4">
        <Code2 className="h-8 w-8 text-primary" />
        <span className="text-xl font-bold tracking-tight">TechBlog</span>
      </div>
      <p className="text-muted-foreground mb-6 max-w-md">
        A modern tech blog focused on web development, programming tutorials, and the latest in technology. Written by
        developers, for developers.
      </p>

      <div className="flex space-x-4">
        <Link href="https://github.com/imkdw" className="text-muted-foreground hover:text-primary smooth-transition">
          <Github className="h-5 w-5" />
        </Link>
        <Link href="mailto:imkdw@kakao.com" className="text-muted-foreground hover:text-primary smooth-transition">
          <Mail className="h-5 w-5" />
        </Link>
      </div>
    </div>
  );
}
