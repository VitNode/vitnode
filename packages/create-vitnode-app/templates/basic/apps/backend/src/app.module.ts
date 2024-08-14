import { join } from 'path';

import { Module } from '@nestjs/common';
import { VitNodeCoreModule } from 'vitnode-backend';

import { PluginsModule } from './plugins/plugins.module';
import { DATABASE_ENVS, schemaDatabase } from './database';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    VitNodeCoreModule.register({
      paths: {
        envFile: join(process.cwd(), '..', '..', '.env'),
      },
      database: {
        config: DATABASE_ENVS,
        schemaDatabase,
      },
    }),
    DatabaseModule,
    PluginsModule,
  ],
})
export class AppModule {}
