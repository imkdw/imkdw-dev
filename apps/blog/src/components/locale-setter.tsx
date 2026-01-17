'use client';

import { useEffect } from 'react';

interface Props {
  locale: string;
}

export function LocaleSetter({ locale }: Props) {
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return null;
}
