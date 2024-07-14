import {
  DevPluginAdminLayout,
  generateMetadataDevPluginAdminLayout,
  DevPluginAdminLayoutProps,
} from 'vitnode-frontend/admin/core/plugins/views/dev/layout/layout';

export const generateMetadata = generateMetadataDevPluginAdminLayout;

export default function Layout(props: DevPluginAdminLayoutProps) {
  return <DevPluginAdminLayout {...props} />;
}
