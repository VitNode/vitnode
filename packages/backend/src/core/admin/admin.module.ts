import { Module } from '@nestjs/common';

import { AdminEmailModule, GlobalAdminEmailModule } from './email/email.module';
import { AdminFilesModule } from './files/files.module';
import { AdminGroupsModule } from './groups/groups.module';
import { AdminInstallModule } from './install/install.module';
import { AdminLanguagesModule } from './languages/languages.module';
import { AdminMembersModule } from './members/members.module';
import { AdminMetadataModule } from './metadata/metadata.module';
import { AdminNavModule } from './nav/nav.module';
import { AdminPluginsModule } from './plugins/plugins.module';
import {
  AdminSecurityModule,
  GlobalAdminSecurityModule,
} from './security/security.module';
import {
  AdminSessionsModule,
  GlobalAdminSessionsModule,
} from './sessions/sessions.module';
import { AdminSettingsModule } from './settings/settings.module';
import { AdminStaffModule } from './staff/staff.module';
import { AdminStylesModule } from './styles/styles.module';
import { AdminThemeEditorModule } from './theme_editor/theme_editor.module';

@Module({
  imports: [
    GlobalAdminSecurityModule,
    GlobalAdminSessionsModule,
    GlobalAdminEmailModule,
    AdminSessionsModule,
    AdminPluginsModule,
    AdminStylesModule,
    AdminStaffModule,
    AdminLanguagesModule,
    AdminFilesModule,
    AdminMembersModule,
    AdminGroupsModule,
    AdminMetadataModule,
    AdminSettingsModule,
    AdminThemeEditorModule,
    AdminInstallModule,
    AdminEmailModule,
    AdminSecurityModule,
    AdminNavModule,
  ],
})
export class AdminModule {}
