import { CustomError } from '@/errors';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { LogsAdminEmailResolver } from './logs/logs.resolver';
import { LogsAdminEmailService } from './logs/logs.service';
import { MailService } from './mail.service';
import { SendAdminEmailService } from './send/send.service';
import { EditAdminEmailSettingsResolver } from './settings/edit/edit.resolver';
import { EditAdminEmailSettingsService } from './settings/edit/edit.service';
import { ShowAdminEmailSettingsResolver } from './settings/show/show.resolver';
import { ShowAdminEmailSettingsService } from './settings/show/show.service';
import { TestAdminEmailSettingsResolver } from './settings/test/test.resolver';
import { TestAdminEmailSettingsService } from './settings/test/test.service';

export interface EmailSenderArgs {
  html: string;
  site_short_name: string;
  subject: string;
  to: string;
}

export type EmailSenderFunction = (params: EmailSenderArgs) => Promise<void>;

@Global()
@Module({})
export class GlobalAdminEmailModule {
  static register(options: { email?: EmailSenderFunction }): DynamicModule {
    return {
      module: GlobalAdminEmailModule,
      providers: [
        {
          provide: 'VITNODE_EMAIL_SENDER',
          useFactory: () => async (params: EmailSenderArgs) => {
            if (!options.email) {
              throw new CustomError({
                code: 'EMAIL_SENDER_NOT_CONFIGURED',
                message: 'Email sender is not configured.',
              });
            }

            await options.email(params);
          },
        },
        {
          provide: 'VITNODE_EMAIL_SENDER_IS_ENABLED',
          useValue: !!options.email,
        },
        SendAdminEmailService,
        MailService,
      ],
      exports: [SendAdminEmailService, MailService],
    };
  }
}

@Module({
  providers: [
    ShowAdminEmailSettingsService,
    ShowAdminEmailSettingsResolver,
    EditAdminEmailSettingsResolver,
    EditAdminEmailSettingsService,
    TestAdminEmailSettingsService,
    TestAdminEmailSettingsResolver,
    LogsAdminEmailService,
    LogsAdminEmailResolver,
  ],
})
export class AdminEmailModule {}
