import { join } from "path";

import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { VitNodeCoreModule } from "vitnode-backend";

import { DatabaseModule } from "./database/database.module";
import { PluginsModule } from "./plugins/plugins.module";
import { ABSOLUTE_PATHS, configForAppModule } from "./config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configForAppModule],
      envFilePath: join(process.cwd(), "..", "..", ".env")
    }),
    PluginsModule,
    DatabaseModule,
    VitNodeCoreModule.register({
      paths: {
        uploadPublic: ABSOLUTE_PATHS.uploads.public,
        graphqlSchema: join(process.cwd(), "schema.gql")
      }
    })
  ]
})
export class AppModule {}
