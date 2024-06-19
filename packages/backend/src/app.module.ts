import { join } from "path";

import { DynamicModule, Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { JwtModule } from "@nestjs/jwt";
import { ServeStaticModule } from "@nestjs/serve-static";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { Ctx } from "./utils";

interface Args {
  paths: {
    graphqlSchema: string;
    uploadPublic: string;
  };
}

@Module({})
export class VitNodeCoreModule {
  static register({ paths }: Args): DynamicModule {
    return {
      module: VitNodeCoreModule,
      imports: [
        GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: join(process.cwd(), "schema.gql"),
          sortSchema: true,
          playground: false,
          plugins: [ApolloServerPluginLandingPageLocalDefault()],
          context: ({ req, res }): Ctx => ({ req, res })
        }),
        ScheduleModule.forRoot(),
        JwtModule.register({ global: true }),
        ServeStaticModule.forRoot({
          rootPath: paths.uploadPublic,
          serveRoot: "/public/"
        })
      ]
    };
  }
}
