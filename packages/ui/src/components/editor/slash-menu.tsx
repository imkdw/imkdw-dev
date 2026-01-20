'use client';

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { useInstance } from '@milkdown/react';
import { usePluginViewContext } from '@prosemirror-adapter/react';
import { SlashProvider } from '@milkdown/kit/plugin/slash';
import { commandsCtx } from '@milkdown/kit/core';
import { insertTableCommand } from '@milkdown/kit/preset/gfm';
import { Table } from 'lucide-react';
import type { Editor } from '@milkdown/kit/core';
import type { EditorView } from '@milkdown/kit/prose/view';
import type { EditorState } from '@milkdown/kit/prose/state';

interface SlashMenuItem {
  key: string;
  label: string;
  icon: ReactNode;
  onSelect: (editor: Editor) => void;
}

const slashMenuItems: SlashMenuItem[] = [
  {
    key: 'table',
    label: 'Table',
    icon: <Table size={18} />,
    onSelect: editor => {
      editor.action(ctx => {
        const commands = ctx.get(commandsCtx);
        commands.call(insertTableCommand.key, { row: 3, col: 3 });
      });
    },
  },
];

export function SlashMenu() {
  const { view, prevState } = usePluginViewContext();
  const slashProviderRef = useRef<SlashProvider | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, getEditor] = useInstance();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelect = useCallback(
    (item: SlashMenuItem) => {
      const editor = getEditor();
      if (!editor) return;

      setIsOpen(false);

      const { state, dispatch } = view;
      const { from } = state.selection;

      const tr = state.tr.deleteRange(from - 1, from);
      dispatch(tr);

      requestAnimationFrame(() => {
        item.onSelect(editor);
      });
    },
    [getEditor, view]
  );

  useEffect(() => {
    if (!menuRef.current || loading) return;

    slashProviderRef.current = new SlashProvider({
      content: menuRef.current,
      shouldShow(this: SlashProvider, editorView: EditorView) {
        const { selection } = editorView.state;
        const { empty } = selection;

        if (!empty) {
          setIsOpen(false);
          return false;
        }

        const text = this.getContent(editorView);

        if (text === '/') {
          setIsOpen(true);
          setSelectedIndex(0);
          return true;
        }

        setIsOpen(false);
        return false;
      },
    });

    return () => {
      slashProviderRef.current?.destroy();
      slashProviderRef.current = null;
    };
  }, [loading]);

  useEffect(() => {
    slashProviderRef.current?.update(view as unknown as EditorView, prevState as unknown as EditorState);
  });

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(prev => (prev + 1) % slashMenuItems.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        e.stopPropagation();
        setSelectedIndex(prev => (prev - 1 + slashMenuItems.length) % slashMenuItems.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        e.stopPropagation();
        const item = slashMenuItems[selectedIndex];
        if (item) handleSelect(item);
      } else if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [isOpen, selectedIndex, handleSelect]);

  return (
    <div ref={menuRef} className="slash-menu" role="listbox" style={{ display: isOpen ? 'block' : 'none' }}>
      {slashMenuItems.map((item, index) => (
        <button
          key={item.key}
          type="button"
          role="option"
          aria-selected={index === selectedIndex}
          className={`slash-menu-item ${index === selectedIndex ? 'selected' : ''}`}
          onClick={() => handleSelect(item)}
          onMouseEnter={() => setSelectedIndex(index)}
        >
          <span className="slash-menu-icon">{item.icon}</span>
          <span className="slash-menu-label">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
