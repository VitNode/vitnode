import { Module } from '@nestjs/common';
import { join } from 'path';
import { VitNodeCoreModule } from 'vitnode-backend';
// import { emailSenderResend } from 'vitnode-backend-email-resend';

import { DATABASE_ENVS, schemaDatabase } from './database/config';
import { DatabaseModule } from './database/database.module';
import { PluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    VitNodeCoreModule.register({
      pathToEnvFile: join(process.cwd(), '..', '..', '.env'),
      database: {
        config: DATABASE_ENVS,
        schemaDatabase,
      },
      // email: emailSenderResend({ api_key: process.env.RESEND_API_KEY }),
    }),
    DatabaseModule,
    PluginsModule,
  ],
})
export class AppModule {}
