import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000']
  });
  await app.listen(8080, null, async () => {
    // eslint-disable-next-line no-console
    console.log(`Application is running on: ${await app.getUrl()}`);
  });
}
bootstrap();
