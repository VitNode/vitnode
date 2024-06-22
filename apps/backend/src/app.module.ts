import { join } from "path";

import { Module } from "@nestjs/common";
import { VitNodeCoreModule } from "vitnode-backend";

import { PluginsModule } from "./plugins/plugins.module";
import { DATABASE_ENVS } from "./database/client";
import { schemaDatabase } from "./database/schema";

@Module({
  imports: [
    VitNodeCoreModule.register({
      paths: {
        envFile: join(process.cwd(), "..", "..", ".env"),
      },
      database: {
        config: DATABASE_ENVS,
        schemaDatabase,
      },
    }),
    PluginsModule,
  ],
})
export class AppModule {}
