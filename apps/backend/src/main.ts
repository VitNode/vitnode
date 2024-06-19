/* eslint-disable no-console */
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import { ValidationPipe } from "@nestjs/common";
import { graphqlUploadExpress } from "vitnode-backend";

import { AppModule } from "./app.module";

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
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`
    );
  });
}
bootstrap();
