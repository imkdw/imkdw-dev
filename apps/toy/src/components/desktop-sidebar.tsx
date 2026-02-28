'use client';

interface Props {
  children: React.ReactNode;
}

export function DesktopSidebar({ children }: Props) {
  return (
    <aside className="hidden md:flex md:flex-col h-full border-r border-border bg-sidebar overflow-y-auto">
      {children}
    </aside>
  );
}
