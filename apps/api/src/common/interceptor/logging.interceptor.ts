import { APP_ENV } from '@imkdw-dev/consts';
import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { Logger } from 'winston';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly isLocal = process.env.NODE_ENV === APP_ENV.LOCAL;

  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    const startTime = Date.now();

    const { method, originalUrl, ip, headers } = request;
    const userAgent = headers['user-agent'] ?? 'Unknown';

    if (this.isLocal) {
      this.logger.debug(`→ ${method} ${originalUrl}`, {
        ip,
        userAgent,
      });
    }

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        const { statusCode } = response;

        const logLevel = this.getLogLevel(statusCode);

        const logMessage = `${method} ${originalUrl} ${statusCode} ${responseTime}ms`;

        this.logger.log(logLevel, logMessage, {
          method,
          url: originalUrl,
          statusCode,
          responseTime: `${responseTime}ms`,
          ip,
          userAgent,
        });
      }),
      catchError(error => {
        const responseTime = Date.now() - startTime;
        const statusCode = error.status ?? 500;

        this.logger.error(`${method} ${originalUrl} ${statusCode} ${responseTime}ms - ${error.message}`, {
          method,
          url: originalUrl,
          statusCode,
          responseTime: `${responseTime}ms`,
          ip,
          userAgent,
          error: {
            name: error.name,
            message: error.message,
            stack: this.isLocal ? error.stack : undefined,
          },
        });

        return throwError(() => error);
      })
    );
  }

  private getLogLevel(statusCode: number): string {
    if (statusCode >= 500) {
      return 'error';
    }

    if (statusCode >= 400) {
      return 'warn';
    }

    return 'info';
  }
}
