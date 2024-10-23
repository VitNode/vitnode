import { Module } from '@nestjs/common';
import { join } from 'path';
import { VitNodeCoreModule } from 'vitnode-backend/app.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    VitNodeCoreModule.register({
      pathToEnvFile: join(process.cwd(), '..', '..', '.env'),
    }),
    PluginsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
