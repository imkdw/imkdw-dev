import { ReactNode } from 'react';

export interface FooterProps {
  children?: ReactNode;
  className?: string;
}

export const Footer = ({ children, className = '' }: FooterProps) => {
  return (
    <footer className={`bg-muted/20 border-t border-border mt-auto ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-6">
        {children}
      </div>
    </footer>
  );
};

export default Footer;