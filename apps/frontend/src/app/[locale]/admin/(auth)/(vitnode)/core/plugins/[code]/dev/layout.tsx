import {
  DevPluginAdminLayout,
  generateMetadataDevPluginAdminLayout,
} from 'vitnode-frontend/admin/core/plugins/views/dev/layout/layout';

export const generateMetadata = generateMetadataDevPluginAdminLayout;

export default function Layout(
  props: React.ComponentProps<typeof DevPluginAdminLayout>,
) {
  return <DevPluginAdminLayout {...props} />;
}
