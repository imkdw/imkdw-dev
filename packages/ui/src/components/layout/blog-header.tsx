'use client';

import { useState, ReactNode } from 'react';
import { Menu, X } from 'lucide-react';

export interface BlogHeaderProps {
  className?: string;
  navigation?: Array<{
    name: string;
    href: string;
  }>;
  logo?: {
    text: string;
    icon?: string;
  };
  LinkComponent?: React.ComponentType<{
    href: string;
    children: ReactNode;
    className?: string;
    'aria-label'?: string;
    onClick?: () => void;
  }>;
}

export const BlogHeader = ({ 
  className = '',
  navigation = [
    { name: 'Articles', href: '/articles' },
    { name: 'Series', href: '/series' },
    { name: 'About', href: '/about' },
  ],
  logo = { text: 'DevBlog', icon: 'D' },
  LinkComponent = ({ href, children, ...props }) => (
    <a href={href} {...props}>{children}</a>
  )
}: BlogHeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`bg-background border-b border-border relative ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <LinkComponent 
            href="/" 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label={`${logo.text} 홈으로 가기`}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">
                {logo.icon}
              </span>
            </div>
            <span className="text-lg font-bold text-foreground">
              {logo.text}
            </span>
          </LinkComponent>

          {/* Desktop Navigation */}
          <nav 
            className="hidden md:flex space-x-6"
            aria-label="메인 네비게이션"
          >
            {navigation.map((item) => (
              <LinkComponent
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md px-2 py-1"
              >
                {item.name}
              </LinkComponent>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 hover:bg-muted rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground" />
            ) : (
              <Menu className="h-5 w-5 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden pb-4 animate-in slide-in-from-top-2 duration-200"
          >
            <nav 
              className="flex flex-col space-y-2"
              aria-label="모바일 네비게이션"
            >
              {navigation.map((item) => (
                <LinkComponent
                  key={item.name}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="text-muted-foreground hover:text-foreground hover:bg-muted transition-colors px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  {item.name}
                </LinkComponent>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default BlogHeader;