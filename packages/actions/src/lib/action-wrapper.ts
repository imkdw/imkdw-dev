import { notFound, forbidden, unauthorized } from 'next/navigation';
import { ApiError } from '@imkdw-dev/api-client';
import { EXCEPTION_MESSAGES } from '@imkdw-dev/exception';
import { toast } from '@imkdw-dev/toast';

function handleServerError(error: ApiError): never {
  switch (error.status) {
    case 404:
      notFound();
    case 403:
      forbidden();
    case 401:
      unauthorized();
    default:
      throw error;
  }
}

function handleClientError(error: ApiError): never {
  const errorMessage =
    error.errorCode && error.errorCode in EXCEPTION_MESSAGES
      ? EXCEPTION_MESSAGES[error.errorCode as keyof typeof EXCEPTION_MESSAGES]
      : '서버와의 통신에 실패했습니다.';

  toast({
    title: '오류',
    description: errorMessage,
    variant: 'destructive',
  });

  throw error;
}

export const withErrorHandling = <T extends any[], R>(
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
