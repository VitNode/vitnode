import {
  AuthorizationSettingsCoreAdminView,
  generateMetadataAuthorizationSettingsAdmin,
} from 'vitnode-frontend/views/admin/views/core/settings/authorization/authorization-settings-core-admin-view';

export const generateMetadata = generateMetadataAuthorizationSettingsAdmin;

export default function Page() {
  return <AuthorizationSettingsCoreAdminView />;
}
