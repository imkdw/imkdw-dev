'use client';

import type { KeyboardEvent } from 'react';
import { useState } from 'react';
import { Card, Button, Input, Badge } from '@imkdw-dev/ui';
import { Plus, X } from 'lucide-react';

interface Props {
  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
}

export function ArticleTagManager({ tags, onAddTag, onRemoveTag }: Props) {
  const [newTag, setNewTag] = useState('');

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(newTag.trim());
      setNewTag('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Card className="p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium mb-3 block text-muted-foreground">태그</label>
          <div className="flex gap-2 flex-wrap mb-3 min-h-[32px]">
            {tags.length === 0 && <span className="text-xs text-muted-foreground/60 italic">태그를 추가해보세요</span>}
            {tags.map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="flex items-center gap-1.5 pl-3 pr-2 py-1.5 hover:bg-secondary/80 transition-colors"
              >
                <span className="text-xs font-medium">{tag}</span>
                <X
                  className="w-3.5 h-3.5 cursor-pointer hover:text-destructive transition-colors"
                  onClick={() => onRemoveTag(tag)}
                />
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="태그 추가..."
              value={newTag}
              onChange={e => setNewTag(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 text-sm"
            />
            <Button size="sm" onClick={handleAddTag} variant="outline" className="px-3">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/70 mt-2">Enter 키로 빠르게 추가</p>
        </div>
      </div>
    </Card>
  );
}
