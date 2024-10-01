import {
  generateMetadataSettingsAiAdmin,
  SettingsAiAdminView,
} from 'vitnode-frontend/views/admin/views/core/ai/settings/settings-ai-admin-view';

export const generateMetadata = generateMetadataSettingsAiAdmin;

export default function Page() {
  return <SettingsAiAdminView />;
}
