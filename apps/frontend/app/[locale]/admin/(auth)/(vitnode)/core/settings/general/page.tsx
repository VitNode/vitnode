import {
  MainSettingsCoreAdminView,
  generateMetadataMainSettingsCoreAdmin,
} from 'vitnode-frontend/admin/core/settings/main/main-settings-core-admin-view';

export const generateMetadata = generateMetadataMainSettingsCoreAdmin;

export default function Page() {
  return <MainSettingsCoreAdminView />;
}
