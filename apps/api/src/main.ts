import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.API_PORT;
  if (!port) {
    throw new Error('PORT is not set');
  }

  await app.listen(port);
}
bootstrap();
