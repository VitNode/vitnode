import { join } from 'path';

import { Module } from '@nestjs/common';
import { VitNodeCoreModule } from 'vitnode-backend';

import { PluginsModule } from './plugins/plugins.module';
import { DATABASE_ENVS, schemaDatabase } from './database';

@Module({
  imports: [
    VitNodeCoreModule.register({
      pathToEnvFile: join(process.cwd(), '..', '..', '.env'),
      database: {
        config: DATABASE_ENVS,
        schemaDatabase,
      },
    }),
    PluginsModule,
  ],
})
export class AppModule {}
