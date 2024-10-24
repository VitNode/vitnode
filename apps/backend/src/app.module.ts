import { Module } from '@nestjs/common';
import { join } from 'path';
import { VitNodeCoreModule } from 'vitnode-backend/app.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DATABASE_ENVS, schemaDatabase } from './database/config';
import { PluginsModule } from './plugins/plugins.module';

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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
