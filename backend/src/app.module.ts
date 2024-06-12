import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { ScheduleModule } from "@nestjs/schedule";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { ServeStaticModule } from "@nestjs/serve-static";
import { Ctx } from "@vitnode/backend";

import { DatabaseModule } from "./database/database.module";
import { PluginsModule } from "./plugins/plugins.module";
import { ABSOLUTE_PATHS, configForAppModule } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configForAppModule],
      envFilePath: join(process.cwd(), "..", ".env")
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "schema.gql"),
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }): Ctx => ({ req, res })
    }),
    JwtModule.register({ global: true }),
    ServeStaticModule.forRoot({
      rootPath: join(ABSOLUTE_PATHS.uploads.public),
      serveRoot: "/public/"
    }),
    ScheduleModule.forRoot(),
    PluginsModule,
    DatabaseModule
  ]
})
export class AppModule {}
