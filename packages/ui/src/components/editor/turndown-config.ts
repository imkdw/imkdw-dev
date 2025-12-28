import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';

function cleanCellContent(content: string): string {
  return content.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getCellAlignment(cell: HTMLElement): string {
  const alignAttr = cell.getAttribute('align')?.toLowerCase() ?? '';
  if (alignAttr) return alignAttr;

  const style = cell.getAttribute('style') ?? '';
  const textAlignMatch = style.match(/text-align:\s*(left|center|right)/i);
  if (textAlignMatch?.[1]) return textAlignMatch[1].toLowerCase();

  return '';
}

function isHeadingRow(tr: HTMLTableRowElement): boolean {
  const parentNode = tr.parentNode as HTMLElement;
  if (parentNode.nodeName === 'THEAD') return true;

  const isFirstChild = parentNode.firstChild === tr;
  const isTableOrFirstTbody =
    parentNode.nodeName === 'TABLE' ||
    (parentNode.nodeName === 'TBODY' &&
      (!parentNode.previousSibling ||
        (parentNode.previousSibling.nodeName === 'THEAD' &&
          /^\s*$/i.test((parentNode.previousSibling as HTMLElement).textContent || ''))));

  if (isFirstChild && isTableOrFirstTbody) {
    return Array.from(tr.childNodes).every(n => n.nodeName === 'TH');
  }

  return false;
}

export function createTurndownService(): TurndownService {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    blankReplacement: (content, node) => {
      if (node.nodeName === 'P') {
        return '\n\n\u00A0\n\n';
      }
      return '';
    },
  });

  service.use(gfm);

  service.addRule('lineBreak', {
    filter: 'br',
    replacement: () => '  \n',
  });

  service.addRule('tableCell', {
    filter: ['th', 'td'],
    replacement: (content, node) => {
      const cleanContent = cleanCellContent(content);
      const index = Array.prototype.indexOf.call(node.parentNode?.childNodes ?? [], node);
      const prefix = index === 0 ? '| ' : ' ';
      return prefix + cleanContent + ' |';
    },
  });

  service.addRule('tableRow', {
    filter: 'tr',
    replacement: (content, node) => {
      const tr = node as HTMLTableRowElement;
      let borderCells = '';
      const alignMap: Record<string, string> = { left: ':--', right: '--:', center: ':-:' };

      if (isHeadingRow(tr)) {
        let isFirst = true;
        for (let i = 0; i < tr.childNodes.length; i++) {
          const child = tr.childNodes[i] as HTMLElement;
          if (child.nodeName !== 'TH' && child.nodeName !== 'TD') continue;

          let border = '---';
          const align = getCellAlignment(child);
          if (align && alignMap[align]) border = alignMap[align];

          const prefix = isFirst ? '| ' : ' ';
          borderCells += prefix + border + ' |';
          isFirst = false;
        }
      }

      return '\n' + content + (borderCells ? '\n' + borderCells : '');
    },
  });

  service.addRule('table', {
    filter: (node): boolean => {
      if (node.nodeName !== 'TABLE') return false;
      const table = node as HTMLTableElement;
      const firstRow = table.rows[0];
      return table.rows.length > 0 && firstRow !== undefined && isHeadingRow(firstRow);
    },
    replacement: content => {
      const cleaned = content.replace(/\n\n+/g, '\n');
      return '\n\n' + cleaned + '\n\n';
    },
  });

  service.addRule('tableSection', {
    filter: ['thead', 'tbody', 'tfoot'],
    replacement: content => content,
  });

  service.addRule('fencedCodeBlockWithLanguage', {
    filter: (node: Node): boolean => {
      return node.nodeName === 'PRE' && !!node.firstChild && node.firstChild.nodeName === 'CODE';
    },
    replacement: (_content: string, node: Node): string => {
      const preElement = node as HTMLPreElement;
      const codeElement = preElement.querySelector('code');

      let language = preElement.getAttribute('data-language') ?? '';

      if (!language && codeElement) {
        const languageClass = Array.from(codeElement.classList).find(cls => cls.startsWith('language-'));
        if (languageClass) {
          language = languageClass.replace('language-', '');
        }
      }

      const codeContent = codeElement?.textContent ?? '';

      return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n`;
    },
  });

  return service;
}
