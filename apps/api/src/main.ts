import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { MyConfigService } from '@/config/my-config.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';

export const getCorsConfig = (env: string) => {
  const corsOrigins = [/^https?:\/\/imkdw\.dev$/, /^https?:\/\/.*\.imkdw\.dev$/];

  if (env !== 'production') {
    corsOrigins.push(/^https?:\/\/localhost:([0-9]{1,5})$/);
    corsOrigins.push(/^https?:\/\/localhost$/);
  }

  return { origin: corsOrigins, credentials: true };
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myConfigService = app.get(MyConfigService);
  const port = myConfigService.get('API_PORT');
  const env = myConfigService.get('APP_ENV');

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors(getCorsConfig(env));

  await app.listen(port);
}
bootstrap();
