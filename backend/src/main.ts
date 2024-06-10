/* eslint-disable no-console */
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { add } from "@vitnode/shared";

import { AppModule } from "./app.module";
import { graphqlUploadExpress } from "./utils/graphql-upload/graphql-upload-express";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    credentials: true,
    origin: [
      process.env.NEXT_PUBLIC_FRONTEND_URL
        ? process.env.NEXT_PUBLIC_FRONTEND_URL
        : "http://localhost:3000",
      "https://sandbox.embed.apollographql.com"
    ]
  });
  app.use(graphqlUploadExpress({ maxFiles: 100 }));

  // Class Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );

  await app.listen(process.env.PORT ?? "8080", null, () => {
    console.log(add(1, 2));
    if (process.env.NEXT_PUBLIC_DEBUG) {
      console.warn(
        "WARNING: Debug mode is enabled. Do not use this in production."
      );
      console.log(
        "DEBUG ENV: NEXT_PUBLIC_FRONTEND_URL -",
        process.env.NEXT_PUBLIC_FRONTEND_URL
      );
      console.log("DEBUG ENV: DB_HOST -", process.env.DB_HOST);
      console.log("DEBUG ENV: DB_PORT -", process.env.DB_PORT);
      console.log("DEBUG ENV: DB_PASSWORD -", process.env.DB_PASSWORD);
      console.log("DEBUG ENV: DB_DATABASE -", process.env.DB_DATABASE);
      console.log(
        "DEBUG ENV: LOGIN_TOKEN_SECRET -",
        process.env.LOGIN_TOKEN_SECRET
      );
    }

    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`
    );
  });
}
bootstrap();
