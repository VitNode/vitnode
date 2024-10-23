/* eslint-disable no-console */
import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

interface CorsOptionsMain extends Omit<CorsOptions, 'credentials'> {
  origin?: (RegExp | string)[];
}

interface Args {
  cors?: CorsOptionsMain;
}

export const nestjsMainApp = async (app: INestApplication, options?: Args) => {
  app.enableCors({
    ...options?.cors,
    credentials: true,
    origin: [
      process.env.NEXT_PUBLIC_FRONTEND_URL
        ? process.env.NEXT_PUBLIC_FRONTEND_URL
        : 'http://localhost:3000',
      ...(options?.cors?.origin ?? []),
    ],
  });

  const port = Number(process.env.PORT) || 8080;
  const hostname = process.env.HOSTNAME ?? 'localhost';
  await app.listen(port, hostname, () => {
    const initConsole = '\x1b[34m[VitNode]\x1b[0m';

    console.log(
      initConsole,
      `Backend is running on: http://${hostname}:${port}/`,
    );
  });
};
