import { join } from "path";

import { Module } from "@nestjs/common";
import { VitNodeCoreModule } from "vitnode-backend";

import { DatabaseModule } from "./database/database.module";
import { PluginsModule } from "./plugins/plugins.module";
import { schemaDatabase } from "./database/schema";

@Module({
  imports: [
    PluginsModule,
    DatabaseModule,
    VitNodeCoreModule.register({
      paths: {
        envFile: join(process.cwd(), "..", "..", ".env")
      },
      schemaDatabase
    })
  ]
})
export class AppModule {}
