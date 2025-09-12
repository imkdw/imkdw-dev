'use client';

import { useState } from 'react';
import { cn } from '../../../lib';
import { jetBrainsMono } from '@imkdw-dev/fonts';

interface Tab {
  name: string;
  active: boolean;
}

interface Props {
  tabs: Tab[];
  activeTab?: string;
  onTabChange?: (tabName: string) => void;
}

export function FileTabs({ tabs, activeTab: controlledActiveTab, onTabChange }: Props) {
  const [internalActiveTab, setInternalActiveTab] = useState(controlledActiveTab || tabs[0]?.name || '');

  const activeTab = controlledActiveTab || internalActiveTab;

  const handleTabChange = (tabName: string) => {
    setInternalActiveTab(tabName);
    onTabChange?.(tabName);
  };

  return (
    <div className="flex overflow-x-auto scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab.name}
          onClick={() => handleTabChange(tab.name)}
          className={cn(
            'px-3 md:px-4 py-2 text-sm border-r border-border/50 transition-colors whitespace-nowrap flex-shrink-0',
            tab.name === activeTab
              ? 'bg-background text-foreground border-b-2 border-primary'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground'
          )}
        >
          <span className={cn('text-xs md:text-sm', jetBrainsMono.className)}>{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
