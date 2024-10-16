/* eslint-disable no-console */
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import {
  graphqlUploadExpress,
  ProcessRequestOptions,
} from './graphql-upload/graphql-upload-express';

interface CorsOptionsMain extends Omit<CorsOptions, 'credentials'> {
  origin?: (RegExp | string)[];
}

interface Args {
  cors?: CorsOptionsMain;
  graphqlUpload?: ProcessRequestOptions;
}

export const nestjsMainApp = async (app: INestApplication, options?: Args) => {
  app.use(cookieParser());
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    }),
  );

  app.enableCors({
    ...options?.cors,
    credentials: true,
    origin: [
      process.env.NEXT_PUBLIC_FRONTEND_URL
        ? process.env.NEXT_PUBLIC_FRONTEND_URL
        : 'http://localhost:3000',
      'https://sandbox.embed.apollographql.com',
      ...(options?.cors?.origin ?? []),
    ],
  });

  // Class Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      enableDebugMessages: process.env.NODE_ENV === 'development',
    }),
  );

  app.use(
    graphqlUploadExpress({
      maxFiles: options?.graphqlUpload ? options.graphqlUpload.maxFiles : 100,
      ...options?.graphqlUpload,
    }),
  );

  const port = Number(process.env.PORT) || 8080;
  const hostname = process.env.HOSTNAME ?? 'localhost';
  await app.listen(port, hostname, () => {
    const initConsole = '\x1b[34m[VitNode]\x1b[0m';

    console.log(
      initConsole,
      `Backend is running on: http://${hostname}:${port}/`,
    );
    console.log(
      initConsole,
      `Apollo GraphQL Playground is running on: http://${hostname}:${port}/graphql`,
    );
  });
};
