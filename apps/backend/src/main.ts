import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { greet } from 'shared/core/test';
import { nestjsMainApp } from 'vitnode-backend/main';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // eslint-disable-next-line no-console
  console.log(greet('test'));

  void nestjsMainApp(app, {});
}
void bootstrap();
