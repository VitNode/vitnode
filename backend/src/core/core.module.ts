import { Module } from '@nestjs/common';

import { CoreAttachmentsModule } from './attachments/core_attachments.module';
import { CoreSessionsModule } from './sessions/core_sessions.module';
import { CoreMembersModule } from './members/core_members.module';
import { CoreLanguagesModule } from './languages/core_languages.module';
import { CoreSetupModule } from './setup/core_setup.module';

@Module({
  imports: [
    CoreMembersModule,
    CoreSessionsModule,
    CoreAttachmentsModule,
    CoreLanguagesModule,
    CoreSetupModule
  ]
})
export class CoreModule {}
