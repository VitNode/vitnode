import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { generateConfigFile } from '../functions/generate-config-file';

import { CONFIG } from '@/config';
import { graphqlUploadExpress } from '@/utils/graphql-upload/graphqlUploadExpress';
import { RedisIoAdapter } from './redis.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFiles: 100 }));
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3000', 'https://sandbox.embed.apollographql.com']
  });

  // Redis
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(CONFIG.port, null, async () => {
    if (!CONFIG.refresh_token.secret || !CONFIG.access_token.secret) {
      throw new Error('Access or Refresh token secret is not defined in .env file');
    }

    generateConfigFile();

    // eslint-disable-next-line no-console
    console.log(`Application is running on: http://localhost:${CONFIG.port}/graphql`);
  });
}
bootstrap();
