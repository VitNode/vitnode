import {
  AiSettingsCoreAdminView,
  generateMetadataAiSettingsAdmin,
} from 'vitnode-frontend/views/admin/views/core/settings/ai/ai-settings-core-admin-view';

export const generateMetadata = generateMetadataAiSettingsAdmin;

export default function Page() {
  return <AiSettingsCoreAdminView />;
}
