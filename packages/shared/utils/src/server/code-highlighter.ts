import hljs from 'highlight.js';
import { JSDOM } from 'jsdom';
import { createElement, type FC } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Copy } from 'lucide-react';

const DEFAULT_LANGUAGE = 'code';

const COPY_ICON_SVG = renderToStaticMarkup(createElement(Copy as FC<{ size?: number }>, { size: 16 }));

export function highlightCodeBlocks(contentHtml: string): string {
  const dom = new JSDOM(contentHtml);
  const { document } = dom.window;

  const codeBlocks = document.querySelectorAll('pre code');
  let codeIndex = 0;

  codeBlocks.forEach((block: Element) => {
    if (!block.textContent) {
      return;
    }

    const preElement = block.parentElement;
    if (!preElement) {
      return;
    }

    const language = extractLanguageFromCodeBlock(block);
    const displayLanguage = language ?? DEFAULT_LANGUAGE;
    const highlightedCode = highlightCode(block.textContent, language);

    block.innerHTML = highlightedCode;

    // Create wrapper element
    const wrapper = createCodeBlockWrapper(document, displayLanguage);

    // Create header element
    const header = createCodeBlockHeader(document, displayLanguage, codeIndex);

    // Insert wrapper and header into DOM
    preElement.parentNode?.insertBefore(wrapper, preElement);
    wrapper.appendChild(header);
    wrapper.appendChild(preElement);

    codeIndex++;
  });

  return document.body.innerHTML;
}

function createCodeBlockWrapper(document: Document, language: string): Element {
  const wrapper = document.createElement('div');
  wrapper.className = 'code-block-wrapper';
  wrapper.setAttribute('data-language', language);
  return wrapper;
}

function createCodeBlockHeader(document: Document, language: string, index: number): Element {
  const header = document.createElement('div');
  header.className = 'code-block-header';

  // Traffic lights
  const trafficLights = createTrafficLights(document);
  header.appendChild(trafficLights);

  // Language badge
  const languageBadge = document.createElement('span');
  languageBadge.className = 'code-block-language';
  languageBadge.textContent = language;
  header.appendChild(languageBadge);

  // Copy button
  const copyButton = createCopyButton(document, index);
  header.appendChild(copyButton);

  return header;
}

function createTrafficLights(document: Document): Element {
  const container = document.createElement('div');
  container.className = 'code-block-traffic-lights';

  const colors = ['red', 'yellow', 'green'];
  colors.forEach(color => {
    const dot = document.createElement('span');
    dot.className = `dot ${color}`;
    container.appendChild(dot);
  });

  return container;
}

function createCopyButton(document: Document, index: number): Element {
  const button = document.createElement('button');
  button.className = 'code-block-copy';
  button.setAttribute('type', 'button');
  button.setAttribute('aria-label', 'Copy code');
  button.setAttribute('data-code-index', String(index));
  button.innerHTML = COPY_ICON_SVG;
  return button;
}

function extractLanguageFromCodeBlock(block: Element): string | undefined {
  const preElement = block.parentElement;

  // Check data-language attribute on pre element
  if (preElement?.hasAttribute('data-language')) {
    return preElement.getAttribute('data-language') ?? undefined;
  }

  // Check language- class prefix on code element
  const languageClass = block.className.split(' ').find((cls: string) => cls.startsWith('language-'));

  return languageClass ? languageClass.replace('language-', '') : undefined;
}

function highlightCode(code: string, language?: string): string {
  if (language && hljs.getLanguage(language)) {
    return hljs.highlight(code, { language, ignoreIllegals: true }).value;
  }

  return hljs.highlightAuto(code).value;
}
