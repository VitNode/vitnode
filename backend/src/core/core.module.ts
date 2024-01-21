import { Module } from '@nestjs/common';

import { CoreSessionsModule } from './sessions/sessions.module';
import { CoreMembersModule } from './members/members.module';
import { CoreLanguagesModule } from './languages/languages.module';
import { CoreMiddlewareModule } from './middleware/middleware.module';
import { CoreFilesModule } from './files/files.module';
import { CorePluginsModule } from './plugins/plugins.module';

@Module({
  imports: [
    CoreMembersModule,
    CoreSessionsModule,
    CoreLanguagesModule,
    CoreMiddlewareModule,
    CoreFilesModule,
    CorePluginsModule
  ]
})
export class CoreModule {}
