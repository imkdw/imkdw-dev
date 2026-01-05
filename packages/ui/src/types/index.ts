import { ComponentType, AnchorHTMLAttributes } from 'react';

export type LinkComponentType = ComponentType<AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }>;
