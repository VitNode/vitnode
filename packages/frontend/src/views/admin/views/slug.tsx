import { notFound } from 'next/navigation';
import { Metadata } from 'next';

import {
  generateMetadataMainSettingsCoreAdmin,
  MainSettingsCoreAdminView,
} from './core/settings/main/main-settings-core-admin-view';
import {
  CaptchaSecurityAdminView,
  generateMetadataCaptchaSecurityAdmin,
} from './core/settings/security/captcha/captcha-security-admin-view';
import {
  generateMetadataManifestMetadataCoreAdmin,
  ManifestMetadataCoreAdminView,
} from './core/settings/metadata/manifest/manifest-metadata-core-view';
import {
  EmailSettingsAdminView,
  generateMetadataEmailSettingsAdmin,
} from './core/settings/email/email-settings-admin-view';
import {
  generateMetadataUsersMembersAdmin,
  UsersMembersAdminView,
} from './members/users/users-members-admin-view';
import {
  generateMetadataLangsCoreAdmin,
  LangsCoreAdminView,
} from './core/langs/langs-core-admin-view';
import { DashboardCoreAdminView } from './core/dashboard/dashboard-core-admin-view';
import {
  FilesAdvancedCoreAdminView,
  generateMetadataFilesAdvancedCoreAdmin,
} from './core/advanced/files/files-advanced-core-admin-view';
import {
  generateMetadataNavAdmin,
  NavAdminView,
} from './core/styles/nav/nav-admin-view';
import {
  EditorAdminView,
  generateMetadataEditorAdmin,
} from './core/styles/editor/editor-admin-view';
import {
  generateMetadataModeratorsStaffAdmin,
  ModeratorsStaffAdminView,
} from './members/staff/moderators/moderators-view';
import {
  AdministratorsStaffAdminView,
  generateMetadataAdministratorsStaffAdmin,
} from './members/staff/administrators/administrators-view';
import {
  generateMetadataGroupsMembersAdmin,
  GroupsMembersAdminView,
} from './members/groups/groups-members-admin-view';
import {
  generateMetadataPluginsAdmin,
  PluginsAdminView,
} from './core/plugins/plugins-admin-view';
import {
  DiagnosticToolsView,
  generateMetadataDiagnosticAdmin,
} from './core/diagnostic/diagnostic-tools-view';
import { SlugViewProps } from '@/views/slug';
import {
  AuthorizationSettingsCoreAdminView,
  generateMetadataAuthorizationSettingsAdmin,
} from './core/settings/authorization/authorization-settings-core-admin-view';

export const generateMetadataSlugAdmin = async ({
  params: { slug },
}: SlugViewProps): Promise<Metadata> => {
  switch (slug[0]) {
    case 'core':
      switch (slug[1]) {
        case 'diagnostic':
          return generateMetadataDiagnosticAdmin();
        case 'advanced':
          switch (slug[2]) {
            case 'files':
              return generateMetadataFilesAdvancedCoreAdmin();
          }
          break;
        case 'styles':
          switch (slug[2]) {
            case 'nav':
              return generateMetadataNavAdmin();
            case 'editor':
              return generateMetadataEditorAdmin();
          }
          break;
        case 'settings':
          switch (slug[2]) {
            case 'general':
              return generateMetadataMainSettingsCoreAdmin();
            case 'security':
              return generateMetadataCaptchaSecurityAdmin();
            case 'metadata':
              return generateMetadataManifestMetadataCoreAdmin();
            case 'email':
              return generateMetadataEmailSettingsAdmin();
            case 'authorization':
              return generateMetadataAuthorizationSettingsAdmin();
          }
          break;
        case 'langs':
          return generateMetadataLangsCoreAdmin();
        case 'plugins':
          return generateMetadataPluginsAdmin();
        case 'dashboard':
          return {};
      }
      break;
    case 'members':
      switch (slug[1]) {
        case 'users':
          return generateMetadataUsersMembersAdmin();
        case 'groups':
          return generateMetadataGroupsMembersAdmin();
      }
      switch (slug[1]) {
        case 'staff':
          switch (slug[2]) {
            case 'moderators':
              return generateMetadataModeratorsStaffAdmin();
            case 'administrators':
              return generateMetadataAdministratorsStaffAdmin();
          }
          break;
      }
      break;
  }

  return {};
};

export const SlugAdminView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  switch (slug[0]) {
    case 'core':
      switch (slug[1]) {
        case 'advanced':
          switch (slug[2]) {
            case 'files':
              return <FilesAdvancedCoreAdminView {...props} />;
          }
          break;
        case 'styles':
          switch (slug[2]) {
            case 'nav':
              return <NavAdminView />;
            case 'editor':
              return <EditorAdminView />;
          }
          break;
        case 'settings':
          switch (slug[2]) {
            case 'general':
              return <MainSettingsCoreAdminView />;
            case 'security':
              return <CaptchaSecurityAdminView />;
            case 'metadata':
              return <ManifestMetadataCoreAdminView />;
            case 'email':
              return <EmailSettingsAdminView />;
            case 'authorization':
              return <AuthorizationSettingsCoreAdminView />;
          }
          break;
        case 'langs':
          return <LangsCoreAdminView {...props} />;
        case 'plugins':
          return <PluginsAdminView {...props} />;
        case 'diagnostic':
          return <DiagnosticToolsView />;
        case 'dashboard':
          return <DashboardCoreAdminView />;
      }
      break;
    case 'members':
      switch (slug[1]) {
        case 'users':
          return <UsersMembersAdminView {...props} />;
        case 'groups':
          return <GroupsMembersAdminView {...props} />;
      }
      switch (slug[1]) {
        case 'staff':
          switch (slug[2]) {
            case 'moderators':
              return <ModeratorsStaffAdminView {...props} />;
            case 'administrators':
              return <AdministratorsStaffAdminView {...props} />;
          }
          break;
      }
      break;
  }

  return notFound();
};
