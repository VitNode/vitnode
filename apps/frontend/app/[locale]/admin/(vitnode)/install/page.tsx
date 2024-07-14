import {
  generateMetadataInstallConfigs,
  InstallConfigsView,
} from 'vitnode-frontend/admin/install/install-configs-view';

export const generateMetadata = generateMetadataInstallConfigs;

export default function Page() {
  return <InstallConfigsView />;
}
