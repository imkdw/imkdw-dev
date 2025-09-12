'use client';

import { FileText, Folder, Zap } from 'lucide-react';

export function BlogStatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
            <FileText className="h-5 w-5 md:h-6 md:w-6 text-primary" />
          </div>
          <div className="text-sm px-2 py-1 bg-primary/10 text-primary rounded-full">.md</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-primary">127</div>
          <div className="text-sm md:text-base font-medium text-foreground">총 게시글</div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-primary/5 rounded-full"></div>
      </div>

      <div className="group relative overflow-hidden bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-accent/10 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
            <Folder className="h-5 w-5 md:h-6 md:w-6 text-accent" />
          </div>
          <div className="text-sm px-2 py-1 bg-accent/10 text-accent rounded-full">active</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-accent">15</div>
          <div className="text-sm md:text-base font-medium text-foreground">진행중인 시리즈</div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-accent/5 rounded-full"></div>
      </div>

      <div className="group relative overflow-hidden bg-gradient-to-br from-terminal-warning/5 to-terminal-warning/10 border border-terminal-warning/20 rounded-xl p-4 md:p-6 hover:shadow-lg hover:shadow-terminal-warning/10 transition-all duration-300 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-terminal-warning/10 rounded-lg group-hover:bg-terminal-warning/20 transition-colors">
            <Zap className="h-5 w-5 md:h-6 md:w-6 text-terminal-warning" />
          </div>
          <div className="text-sm px-2 py-1 bg-terminal-warning/10 text-terminal-warning rounded-full">cron</div>
        </div>
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-terminal-warning">매주</div>
          <div className="text-sm md:text-base font-medium text-foreground">새로운 콘텐츠</div>
        </div>
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-terminal-warning/5 rounded-full"></div>
      </div>
    </div>
  );
}
