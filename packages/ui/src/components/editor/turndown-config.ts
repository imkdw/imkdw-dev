import TurndownService from 'turndown';

export function createTurndownService(): TurndownService {
  const service = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
  });

  service.keep(['br']);

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
