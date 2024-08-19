/* eslint-disable no-console */
import { NestFactory } from '@nestjs/core';
import { nestjsMainApp } from 'vitnode-backend';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  nestjsMainApp(app, {
    cors: {
      origin: [
        process.env.NEXT_PUBLIC_FRONTEND_URL
          ? process.env.NEXT_PUBLIC_FRONTEND_URL
          : 'http://localhost:3000',
      ],
    },
  });

  await app.listen(process.env.PORT ?? '8080', '', () => {
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`,
    );
  });
}
bootstrap();
