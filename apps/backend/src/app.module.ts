import { Module } from '@nestjs/common';
import { join } from 'path';
import { VitNodeCoreModule } from 'vitnode-backend';
import { emailSenderResend } from 'vitnode-backend-email-resend';
// import { emailSenderSMTP } from 'vitnode-backend-email-smtp';

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
      email: emailSenderResend({
        api_key: process.env.EMAIL_RESEND_API_KEY,
        from: process.env.EMAIL_RESEND_FROM,
      }),
      // email: emailSenderSMTP({
      //   host: process.env.EMAIL_SMTP_HOST,
      //   port: process.env.EMAIL_SMTP_PORT,
      //   secure: process.env.EMAIL_SMTP_SECURE === 'true',
      //   user: process.env.EMAIL_SMTP_USER,
      //   password: process.env.EMAIL_SMTP_PASSWORD,
      //   from: process.env.EMAIL_SMTP_FROM,
      // }),
    }),
    DatabaseModule,
    PluginsModule,
  ],
})
export class AppModule {}
