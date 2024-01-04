import { Module } from '@nestjs/common';

import { CoreAttachmentsModule } from './attachments/attachments.module';
import { CoreSessionsModule } from './sessions/sessions.module';
import { CoreMembersModule } from './members/members.module';
import { CoreLanguagesModule } from './languages/languages.module';
import { CoreMiddlewareModule } from './middleware/middleware.module';

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
