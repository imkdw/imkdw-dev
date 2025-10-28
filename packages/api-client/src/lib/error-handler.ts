import { notFound, forbidden, unauthorized } from 'next/navigation';
import { ApiError } from '../types';
import { EXCEPTION_MESSAGES } from '@imkdw-dev/exception';

function handleServerError(error: ApiError) {
  // eslint-disable-next-line no-console
  console.error('[API Error - Server Side]', {
    message: error.message,
    status: error.status,
    statusText: error.statusText,
    url: error.url,
    errorCode: error.errorCode,
    cause: error.cause,
    timestamp: new Date().toISOString(),
  });

  switch (error.status) {
    case 404:
      return notFound();
    case 403:
      return forbidden();
    case 401:
      return unauthorized();
    default:
      throw error;
  }
}

async function handleClientError(error: ApiError): Promise<never> {
  const errorMessage =
    error.errorCode && error.errorCode in EXCEPTION_MESSAGES
      ? EXCEPTION_MESSAGES[error.errorCode as keyof typeof EXCEPTION_MESSAGES]
      : '서버와의 통신에 실패했습니다.';

  const { toast } = await import('@imkdw-dev/toast');
  toast({
    title: '',
    description: errorMessage,
    variant: 'destructive',
  });

  throw error;
}

export const withErrorHandling = <T extends unknown[], R>(
  actionFn: (...args: T) => Promise<R>
): ((...args: T) => Promise<R>) => {
  return async (...args: T): Promise<R> => {
    try {
      return await actionFn(...args);
    } catch (error) {
      if (error instanceof ApiError) {
        const isServer = typeof window === 'undefined';

        if (isServer) {
          handleServerError(error);
        } else {
          handleClientError(error);
        }
      }

      throw error;
    }
  };
};
