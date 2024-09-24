import { Global, Module } from '@nestjs/common';

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

@Global()
@Module({
  providers: [SendAdminEmailService, MailService],
  exports: [SendAdminEmailService, MailService],
})
export class GlobalAdminEmailModule {}
