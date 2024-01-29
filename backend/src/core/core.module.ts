import { Module } from '@nestjs/common';

import { CoreSessionsModule } from './sessions/sessions.module';
import { CoreMembersModule } from './members/members.module';
import { CoreLanguagesModule } from './languages/languages.module';
import { CoreMiddlewareModule } from './middleware/middleware.module';
import { CoreFilesModule } from './files/files.module';
import { CoreThemesModule } from './themes/themes.module';

@Module({
  imports: [
    CoreMembersModule,
    CoreSessionsModule,
    CoreLanguagesModule,
    CoreMiddlewareModule,
    CoreFilesModule,
    CoreThemesModule
  ]
})
export class CoreModule {}
