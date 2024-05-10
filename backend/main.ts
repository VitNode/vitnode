import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import * as cookieParser from "cookie-parser";

import { AppModule } from "./app.module";
import { execShellCommand } from "./functions/exec-shell-command";

import { graphqlUploadExpress } from "@/utils/graphql-upload/graphqlUploadExpress";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  );
  app.use(graphqlUploadExpress({ maxFiles: 100 }));
  app.enableCors({
    credentials: true,
    origin: [
      process.env.NEXT_PUBLIC_FRONTEND_URL
        ? `https://${process.env.NEXT_PUBLIC_FRONTEND_URL}`
        : "http://localhost:3000",
      "https://sandbox.embed.apollographql.com"
    ]
  });

  await app.listen(process.env.PORT ?? "8080", null, () => {
    if (process.env.NODE_ENV !== "development") {
      execShellCommand("pnpm codegen");
    }

    // eslint-disable-next-line no-console
    console.log(
      `Application is running on: http://localhost:${process.env.PORT ?? 8080}/graphql`
    );
  });
}
bootstrap();
