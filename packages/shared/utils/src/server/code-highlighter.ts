import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';

export function highlightCodeBlocks(contentHtml: string): string {
  const dom = new JSDOM(contentHtml);
  const { document } = dom.window;

  const codeBlocks = document.querySelectorAll('pre code');

  codeBlocks.forEach((block: Element) => {
    if (!block.textContent) {
      return;
    }

    const language = extractLanguageFromCodeBlock(block);
    const highlightedCode = highlightCode(block.textContent, language);

    block.innerHTML = highlightedCode;
  });

  return document.body.innerHTML;
}

function extractLanguageFromCodeBlock(block: Element): string | undefined {
  const preElement = block.parentElement;

  // data-language 속성에서 언어 정보 확인
  if (preElement?.hasAttribute('data-language')) {
    return preElement.getAttribute('data-language') ?? undefined;
  }

  // class 속성에서 language- 접두사로 언어 정보 확인
  const languageClass = block.className.split(' ').find((cls: string) => cls.startsWith('language-'));

  return languageClass ? languageClass.replace('language-', '') : undefined;
}

function highlightCode(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  }

  return hljs.highlightAuto(code).value;
}
