import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { MyConfigService } from '@/config/my-config.service';
import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { APP_ENV } from '@imkdw-dev/consts';

function getCorsConfig(env: string) {
  const corsOrigins = [/^https?:\/\/imkdw\.dev$/, /^https?:\/\/.*\.imkdw\.dev$/];

  if (env !== APP_ENV.PRODUCTION) {
    corsOrigins.push(/^https?:\/\/localhost:([0-9]{1,5})$/);
    corsOrigins.push(/^https?:\/\/localhost$/);
  }

  return { origin: corsOrigins, credentials: true };
}

function setSwagger(app: INestApplication, configService: MyConfigService) {
  if (configService.get('APP_ENV') !== 'production') {
    const SWAGGER_PATH = '/api';

    const config = new DocumentBuilder()
      .setTitle('IMKDW Dev API')
      .setVersion('1.0.0')
      .addCookieAuth('accessToken', { type: 'apiKey', name: 'accessToken', in: 'cookie' })
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(SWAGGER_PATH, app, document, {
      swaggerOptions: { docExpansion: 'none', filter: true },
      jsonDocumentUrl: 'api/json',
    });
  }
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const myConfigService = app.get(MyConfigService);
  const port = myConfigService.get('API_PORT');
  const env = myConfigService.get('APP_ENV');

  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors(getCorsConfig(env));

  setSwagger(app, myConfigService);

  await app.listen(port);
}

// eslint-disable-next-line no-console
bootstrap().catch(err => console.error(err));
