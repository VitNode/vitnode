import { readFileSync } from 'fs';
import { join } from 'path';

import { INestApplication, ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  ProcessRequestOptions,
  graphqlUploadExpress,
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
      'https://sandbox.embed.apollographql.com',
      ...(options?.cors?.origin ?? []),
    ],
  });

  // Class Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  app.use(
    graphqlUploadExpress({
      maxFiles: options?.graphqlUpload ? options.graphqlUpload.maxFiles : 100,
      ...options?.graphqlUpload,
    }),
  );

  const pkg: {
    version: string;
  } = JSON.parse(readFileSync(join(process.cwd(), 'package.json'), 'utf-8'));

  const config = new DocumentBuilder()
    .setTitle('VitNode App')
    .setVersion(pkg.version)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
