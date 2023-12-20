import { Module } from '@nestjs/common';

import { CoreAttachmentsModule } from './attachments/core_attachments.module';
import { CoreSessionsModule } from './sessions/core_sessions.module';
import { CoreMembersModule } from './members/core_members.module';
import { CoreLanguagesModule } from './languages/core_languages.module';
import { CoreMiddlewareModule } from './middleware/core_middleware.module';

@Module({
  imports: [
    CoreMembersModule,
    CoreSessionsModule,
    CoreAttachmentsModule,
    CoreLanguagesModule,
    CoreMiddlewareModule
  ]
})
export class CoreModule {}
