'use client';

import { RouteError } from '@/components/error/route-error';

interface Props {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: Props) {
  return <RouteError error={error} reset={reset} namespace="errors.article" />;
}
