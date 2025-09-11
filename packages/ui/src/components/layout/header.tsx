import { ReactNode } from 'react';

export interface HeaderProps {
  children?: ReactNode;
  className?: string;
}

export const Header = ({ children, className = '' }: HeaderProps) => {
  return (
    <header className={`bg-background border-b border-border ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {children}
      </div>
    </header>
  );
};

export default Header;