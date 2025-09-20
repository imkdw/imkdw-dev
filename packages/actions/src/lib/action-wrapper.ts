'use server';

import { notFound, forbidden, unauthorized } from 'next/navigation';
import { ApiError } from '@imkdw-dev/api-client';
import { EXCEPTION_MESSAGES, ExceptionCode } from '@imkdw-dev/exception';

function handleServerError(error: ApiError): never {
  switch (error.status) {
    case 404:
      notFound();
      break;
    case 403:
      forbidden();
      break;
    case 401:
      unauthorized();
      break;
    default:
      throw error;
  }
}

function handleClientError(error: ApiError): never {
  const errorMessage =
    error.errorCode && error.errorCode in EXCEPTION_MESSAGES
      ? EXCEPTION_MESSAGES[error.errorCode as keyof typeof EXCEPTION_MESSAGES]
      : '서버와의 통신에 실패했습니다.';

  const enhancedError = new ApiError(error.status, error.statusText, error.url, error.errorCode, errorMessage);

  throw enhancedError;
}

export function withErrorHandling<T extends any[], R>(
  actionFn: (...args: T) => Promise<R>
): (...args: T) => Promise<R> {
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
}
