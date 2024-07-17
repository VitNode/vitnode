/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { INestApplication } from '@nestjs/common';
import { nestjsMainApp } from 'vitnode-backend';

import { AppModule } from './app.module';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  nestjsMainApp(app, {
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_FRONTEND_URL
          ? process.env.NEXT_PUBLIC_FRONTEND_URL
          : 'http://localhost:3000',
      ],
    },
  });

  await app.listen(process.env.PORT ?? '8080', null, () => {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`,
    );
  });
}
bootstrap();
