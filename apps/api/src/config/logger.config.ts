import { APP_ENV } from '@imkdw-dev/consts';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

const currentEnv = process.env.APP_ENV;
const isLocal = currentEnv === APP_ENV.LOCAL;
const isDevelopment = currentEnv === APP_ENV.DEVELOPMENT;
const isTest = currentEnv === APP_ENV.TEST;
const isProduction = currentEnv === APP_ENV.PRODUCTION;

const localFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.ms(),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, ms, stack, ...metadata }) => {
    let log = `[${timestamp}] [${level}]`;

    log += ` ${message}`;

    if (ms) {
      log += ` ${ms}`;
    }

    if (Object.keys(metadata).length > 0) {
      log += `\n${JSON.stringify(metadata, null, 2)}`;
    }

    if (stack) {
      log += `\n${stack}`;
    }

    return log;
  })
);

const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json()
);

function getTransports(): winston.transport[] {
  if (isTest) {
    return [];
  }

  if (isLocal) {
    return [new winston.transports.Console({ format: localFormat })];
  }

  if (isProduction || isDevelopment) {
    return [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: productionFormat,
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        format: productionFormat,
      }),
    ];
  }

  return [];
}

function getFileHandlers(): winston.transport[] {
  if (isTest) {
    return [];
  }
  return [new winston.transports.File({ filename: 'logs/exceptions.log' })];
}

export const loggerConfig: WinstonModuleOptions = {
  level: isLocal ? 'debug' : 'info',
  format: isLocal ? localFormat : productionFormat,
  transports: getTransports(),
  exceptionHandlers: getFileHandlers(),
  rejectionHandlers: getFileHandlers(),
  silent: isTest,
};
