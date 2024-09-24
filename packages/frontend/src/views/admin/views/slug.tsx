import { redirect } from '@/navigation';
import { SlugViewProps } from '@/views/slug';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  FilesAdvancedCoreAdminView,
  generateMetadataFilesAdvancedCoreAdmin,
} from './core/advanced/files/files-advanced-core-admin-view';
import { DashboardCoreAdminView } from './core/dashboard/dashboard-core-admin-view';
import {
  DiagnosticToolsView,
  generateMetadataDiagnosticAdmin,
} from './core/diagnostic/diagnostic-tools-view';
import {
  generateMetadataLangsCoreAdmin,
  LangsCoreAdminView,
} from './core/langs/langs-core-admin-view';
import {
  generateMetadataPluginsAdmin,
  PluginsAdminView,
} from './core/plugins/plugins-admin-view';
import {
  AuthorizationSettingsCoreAdminView,
  generateMetadataAuthorizationSettingsAdmin,
} from './core/settings/authorization/authorization-settings-core-admin-view';
import {
  EmailSettingsAdminView,
  generateMetadataEmailSettingsAdmin,
} from './core/settings/email/email-settings-admin-view';
import {
  generateMetadataLegalSettingsAdmin,
  LegalSettingsAdminView,
} from './core/settings/legal/legal-core-admin-view';
import {
  generateMetadataMainSettingsCoreAdmin,
  MainSettingsCoreAdminView,
} from './core/settings/main/main-settings-core-admin-view';
import {
  generateMetadataManifestMetadataCoreAdmin,
  ManifestMetadataCoreAdminView,
} from './core/settings/metadata/manifest/manifest-metadata-core-view';
import {
  CaptchaSecurityAdminView,
  generateMetadataCaptchaSecurityAdmin,
} from './core/settings/security/captcha/captcha-security-admin-view';
import {
  EditorAdminView,
  generateMetadataEditorAdmin,
} from './core/styles/editor/editor-admin-view';
import {
  generateMetadataNavAdmin,
  NavAdminView,
} from './core/styles/nav/nav-admin-view';
import {
  generateMetadataGroupsMembersAdmin,
  GroupsMembersAdminView,
} from './members/groups/groups-members-admin-view';
import {
  AdministratorsStaffAdminView,
  generateMetadataAdministratorsStaffAdmin,
} from './members/staff/administrators/administrators-view';
import {
  generateMetadataModeratorsStaffAdmin,
  ModeratorsStaffAdminView,
} from './members/staff/moderators/moderators-view';
import {
  generateMetadataUserMembersAdmin,
  UserMembersAdminView,
} from './members/users/user/user-members-admin-view';
import {
  generateMetadataUsersMembersAdmin,
  UsersMembersAdminView,
} from './members/users/users-members-admin-view';
import {
  generateMetadataLogsEmailSettingsAdmin,
  LogsEmailSettingsAdminView,
} from './core/settings/email/logs/logs-email-settings-admin-view';

export const generateMetadataSlugAdmin = async ({
  params: { slug },
}: SlugViewProps): Promise<Metadata> => {
  // Core routes
  if (slug[0] === 'core') {
    if (slug[1] === 'advanced' && !slug[3]) {
      if (slug[2] === 'files') return generateMetadataFilesAdvancedCoreAdmin();
    }

    if (slug[1] === 'styles' && !slug[3]) {
      if (slug[2] === 'nav') return generateMetadataNavAdmin();
      if (slug[2] === 'editor') return generateMetadataEditorAdmin();
    }

    if (slug[1] === 'settings' && !slug[4]) {
      if (slug[2] === 'email') {
        if (slug[3] === 'logs') return generateMetadataLogsEmailSettingsAdmin();

        if (!slug[3]) return generateMetadataEmailSettingsAdmin();
      }

      if (!slug[3]) {
        if (slug[2] === 'general')
          return generateMetadataMainSettingsCoreAdmin();
        if (slug[2] === 'security')
          return generateMetadataCaptchaSecurityAdmin();
        if (slug[2] === 'metadata')
          return generateMetadataManifestMetadataCoreAdmin();
        if (slug[2] === 'authorization')
          return generateMetadataAuthorizationSettingsAdmin();
        if (slug[2] === 'legal') return generateMetadataLegalSettingsAdmin();
      }
    }

    if (!slug[2]) {
      if (slug[1] === 'langs') return generateMetadataLangsCoreAdmin();
      if (slug[1] === 'plugins') return generateMetadataPluginsAdmin();
      if (slug[1] === 'diagnostic') return generateMetadataDiagnosticAdmin();
    }
  }

  // Members routes
  if (slug[0] === 'members') {
    if (slug[1] === 'staff') {
      if (slug[2] === 'moderators' && !slug[3])
        return generateMetadataModeratorsStaffAdmin();
      if (slug[2] === 'administrators' && !slug[3])
        return generateMetadataAdministratorsStaffAdmin();
    }

    if (slug[1] === 'groups' && !slug[2])
      return generateMetadataGroupsMembersAdmin();

    if (slug[1] === 'users' && !slug[3]) {
      if (slug[2]) {
        return generateMetadataUserMembersAdmin({ id: +slug[2] });
      }

      return generateMetadataUsersMembersAdmin();
    }
  }

  return {};
};

export const SlugAdminView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  // Core routes
  if (slug[0] === 'core') {
    if (slug[1] === 'advanced' && !slug[3]) {
      if (slug[2] === 'files') return <FilesAdvancedCoreAdminView {...props} />;

      if (!slug[2]) redirect('/admin/core/advanced/files');
    }

    if (slug[1] === 'styles' && !slug[3]) {
      if (slug[2] === 'nav') return <NavAdminView />;
      if (slug[2] === 'editor') return <EditorAdminView />;

      if (!slug[2]) redirect('/admin/core/styles/nav');
    }

    if (slug[1] === 'settings' && !slug[4]) {
      if (slug[2] === 'email') {
        if (slug[3] === 'logs') return <LogsEmailSettingsAdminView />;

        if (!slug[3]) return <EmailSettingsAdminView />;
      }

      if (!slug[3]) {
        if (slug[2] === 'general') return <MainSettingsCoreAdminView />;
        if (slug[2] === 'security') return <CaptchaSecurityAdminView />;
        if (slug[2] === 'metadata') return <ManifestMetadataCoreAdminView />;

        if (slug[2] === 'authorization')
          return <AuthorizationSettingsCoreAdminView />;
        if (slug[2] === 'legal') return <LegalSettingsAdminView {...props} />;
      }
      if (!slug[2]) redirect('/admin/core/settings/general');
    }

    if (!slug[2]) {
      if (slug[1] === 'langs') return <LangsCoreAdminView {...props} />;
      if (slug[1] === 'plugins') return <PluginsAdminView {...props} />;
      if (slug[1] === 'diagnostic') return <DiagnosticToolsView />;
      if (slug[1] === 'dashboard') return <DashboardCoreAdminView />;
    }
  }

  // Members routes
  if (slug[0] === 'members') {
    if (slug[1] === 'staff') {
      if (slug[2] === 'moderators' && !slug[3])
        return <ModeratorsStaffAdminView {...props} />;
      if (slug[2] === 'administrators' && !slug[3])
        return <AdministratorsStaffAdminView {...props} />;

      if (!slug[2]) redirect('/admin/members/staff/moderators');
    }

    if (slug[1] === 'groups' && !slug[2])
      return <GroupsMembersAdminView {...props} />;

    if (slug[1] === 'users' && !slug[3]) {
      if (slug[2]) {
        return <UserMembersAdminView id={+slug[2]} />;
      }

      return <UsersMembersAdminView {...props} />;
    }
  }

  return notFound();
};
