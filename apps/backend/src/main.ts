import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { greetTest } from 'shared/types/test';
import { nestjsMainApp } from 'vitnode-backend/main';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  // eslint-disable-next-line no-console
  console.log(greetTest('test'));

  void nestjsMainApp(app, {});
}
void bootstrap();
