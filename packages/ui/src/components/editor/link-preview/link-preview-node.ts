import { $node } from '@milkdown/kit/utils';

export interface LinkPreviewAttrs {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  favicon: string | null;
  loading: boolean;
}

export const linkPreviewNode = $node('link_preview', () => ({
  group: 'block',
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    url: { default: '' },
    title: { default: null },
    description: { default: null },
    image: { default: null },
    siteName: { default: null },
    favicon: { default: null },
    loading: { default: true },
  },
  parseDOM: [
    {
      tag: 'div[data-type="link-preview"]',
      getAttrs: (dom: HTMLElement) => ({
        url: dom.getAttribute('data-url') ?? '',
        title: dom.getAttribute('data-title'),
        description: dom.getAttribute('data-description'),
        image: dom.getAttribute('data-image'),
        siteName: dom.getAttribute('data-site-name'),
        favicon: dom.getAttribute('data-favicon'),
        loading: false,
      }),
    },
  ],
  toDOM: node => [
    'div',
    {
      'data-type': 'link-preview',
      'data-url': node.attrs.url,
      'data-title': node.attrs.title,
      'data-description': node.attrs.description,
      'data-image': node.attrs.image,
      'data-site-name': node.attrs.siteName,
      'data-favicon': node.attrs.favicon,
    },
  ],
  parseMarkdown: {
    match: node => node.type === 'leafDirective' && node.name === 'linkpreview',
    runner: (state, node, type) => {
      const attrs = node.attributes as Record<string, string>;
      state.addNode(type, {
        url: attrs.url ?? '',
        title: attrs.title ?? null,
        description: attrs.description ?? null,
        image: attrs.image ?? null,
        siteName: attrs.siteName ?? null,
        favicon: attrs.favicon ?? null,
        loading: false,
      });
    },
  },
  toMarkdown: {
    match: node => node.type.name === 'link_preview',
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'linkpreview',
        attributes: {
          url: node.attrs.url,
          title: node.attrs.title ?? '',
          description: node.attrs.description ?? '',
          image: node.attrs.image ?? '',
          siteName: node.attrs.siteName ?? '',
          favicon: node.attrs.favicon ?? '',
        },
      });
    },
  },
}));
