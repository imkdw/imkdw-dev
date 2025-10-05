'use client';

import { MilkdownProvider } from '@milkdown/react';
import { MilkdownEditor } from './milkdown-editor';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(markdown: string, html: string): void;
  onUploadImage(imageName: string): void;
}

export function MilkdownWrapper({ content, isEditable, onChangeContent, onUploadImage }: Props) {
  return (
    <MilkdownProvider>
      <MilkdownEditor
        content={content}
        isEditable={isEditable}
        onChangeContent={onChangeContent}
        onUploadImage={onUploadImage}
      />
    </MilkdownProvider>
  );
}
