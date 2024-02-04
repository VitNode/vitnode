import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { RedisIoAdapter } from './redis.adapter';

import { graphqlUploadExpress } from '@/utils/graphql-upload/graphqlUploadExpress';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.use(graphqlUploadExpress({ maxFiles: 100 }));
  app.enableCors({
    credentials: true,
    origin: [
      process.env.FRONTEND_URL,
      'http://localhost:3000',
      'https://sandbox.embed.apollographql.com'
    ]
  });

  // Redis
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  await app.listen(process.env.PORT ?? '8080', null, () => {
    // eslint-disable-next-line no-console
    console.log(`Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`);
  });
}
bootstrap();
