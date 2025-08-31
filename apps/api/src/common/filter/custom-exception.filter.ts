import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomException } from '../exception/custom.exception';

@Catch(CustomException)
export class CustomExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: CustomException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const { errorCode, message, statusCode } = exception;
    const { httpAdapter } = this.httpAdapterHost;

    this.logger.error(exception.message);

    const responseBody = {
      statusCode,
      errorCode,
      message,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };

    httpAdapter.reply(ctx.getResponse(), { error: responseBody }, statusCode);
  }
}
