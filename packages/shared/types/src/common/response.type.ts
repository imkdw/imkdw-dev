import { ExceptionCode } from '@imkdw-dev/exception';

export interface ErrorResponse {
  statusCode: number;
  errorCode: ExceptionCode;
  message: string;
  timestamp: string;
  path: string;
}
