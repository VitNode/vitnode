import { PermissionsAdminDevPluginAdminView } from 'vitnode-frontend/views/admin/views/core/plugins/views/dev/permissions-admin/permissions-admin';

export default function Page(
  props: React.ComponentProps<typeof PermissionsAdminDevPluginAdminView>,
) {
  return <PermissionsAdminDevPluginAdminView {...props} />;
}
