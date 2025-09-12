import { ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
}

export const Sidebar = ({ children, className = '', isOpen = false }: Props) => {
  return (
    <aside
      className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        fixed inset-y-0 left-0 z-50 w-64 border-r border-border
        transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-auto
        ${className}
      `}
    >
      <div className="flex flex-col h-full p-4">{children}</div>
    </aside>
  );
};
