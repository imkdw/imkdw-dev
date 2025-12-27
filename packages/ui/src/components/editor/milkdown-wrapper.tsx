'use client';

import { MilkdownProvider } from '@milkdown/react';
import { ProsemirrorAdapterProvider } from '@prosemirror-adapter/react';
import { MilkdownEditor } from './milkdown-editor';
import { EditorController } from './editor-controller';

interface Props {
  content: string;
  isEditable: boolean;
  onChangeContent(html: string): void;
  onUploadImage(imageName: string): void;
  onEditorReady?: (replaceContent: (content: string) => void) => void;
}

export function MilkdownWrapper({ content, isEditable, onChangeContent, onUploadImage, onEditorReady }: Props) {
  return (
    <MilkdownProvider>
      <ProsemirrorAdapterProvider>
        <MilkdownEditor
          content={content}
          isEditable={isEditable}
          onChangeContent={onChangeContent}
          onUploadImage={onUploadImage}
        />
        {onEditorReady && <EditorController onReady={onEditorReady} />}
      </ProsemirrorAdapterProvider>
    </MilkdownProvider>
  );
}
