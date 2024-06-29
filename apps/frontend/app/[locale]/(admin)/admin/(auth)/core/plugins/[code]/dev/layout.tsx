import { Metadata } from 'next';
import {
  DevPluginAdminLayout,
  generateMetadataDevPluginAdminLayout,
  DevPluginAdminLayoutProps,
} from 'vitnode-frontend/admin/core/plugins/views/dev/layout/layout';

export async function generateMetadata(
  props: DevPluginAdminLayoutProps,
): Promise<Metadata> {
  const metadata = await generateMetadataDevPluginAdminLayout(props);

  return metadata;
}

export default function Layout(props: DevPluginAdminLayoutProps) {
  return <DevPluginAdminLayout {...props} />;
}
