import {
  PluginsAdminView,
  PluginsAdminViewProps,
  generateMetadataPluginsAdmin,
} from 'vitnode-frontend/admin/core/plugins/plugins-admin-view';

export const generateMetadata = generateMetadataPluginsAdmin;

export default function Page(props: PluginsAdminViewProps) {
  return <PluginsAdminView {...props} />;
}
