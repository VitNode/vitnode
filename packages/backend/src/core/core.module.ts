import { Module } from '@nestjs/common';

import { CoreNavModule } from './nav/nav.module';
import {
  CoreSessionsModule,
  GlobalCoreSessionsModule,
} from './sessions/sessions.module';
import { AdminModule } from './admin/admin.module';
import { GlobalCoreHelpersModule } from './helpers/helpers.module';
import { CorePluginsModule } from './plugins/plugins.module';
import { CoreLanguagesModule } from './languages/languages.module';
import { CoreFilesModule, GlobalCoreFilesModule } from './files/files.module';
import { CoreEditorModule } from './editor/editor.module';
import { CoreMembersModule } from './members/members.module';
import { CoreMiddlewareModule } from './middleware/middleware.module';
import { CoreSettingsModule } from './settings/settings.module';
import { CoreThemeEditorModule } from './theme_editor/theme_editor.module';

@Module({
  imports: [
    AdminModule,
    CoreNavModule,
    GlobalCoreSessionsModule,
    CoreSessionsModule,
    GlobalCoreHelpersModule,
    CorePluginsModule,
    CoreLanguagesModule,
    GlobalCoreFilesModule,
    CoreFilesModule,
    CoreEditorModule,
    CoreMembersModule,
    CoreMiddlewareModule,
    CoreSettingsModule,
    CoreThemeEditorModule,
  ],
})
export class CoreModule {}
