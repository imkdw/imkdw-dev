import { Heart } from 'lucide-react';

interface Props {
  className?: string;
}

export function FooterBottom({ className }: Props) {
  const currentYear = new Date().getFullYear();

  return (
    <div className={className}>
      <p className="text-sm text-muted-foreground">© {currentYear} TechBlog. All rights reserved.</p>
      <p className="text-sm text-muted-foreground flex items-center">
        Built with <Heart className="h-4 w-4 mx-1 text-red-500" /> using React & TypeScript
      </p>
    </div>
  );
}