import { join } from "path";

import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";

import { GlobalCoreSessionsModule } from "./core/sessions/sessions.module";
import { CoreModule } from "./core/core.module";
import { AdminModule } from "./admin/admin.module";
import { GlobalAdminSessionsModule } from "./admin/core/sessions/sessions.module";
import { ModulesModule } from "../modules.module";
import { configuration } from "../configuration";

import { Ctx } from "@/types/context.type";
import { DatabaseModule } from "@/database/database.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      sortSchema: true,
      context: ({ req, res }): Ctx => ({ req, res })
    }),
    JwtModule.register({ global: true }),
    GlobalCoreSessionsModule,
    GlobalAdminSessionsModule,
    CoreModule,
    AdminModule,
    ModulesModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "../public"),
      serveRoot: "/public"
    }),
    ScheduleModule.forRoot(),
    DatabaseModule
  ]
})
export class AppModule {}
