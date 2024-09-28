import { NavDevPluginAdminView } from 'vitnode-frontend/views/admin/views/core/plugins/views/dev/nav/nav';

export default function Page(
  props: React.ComponentProps<typeof NavDevPluginAdminView>,
) {
  return <NavDevPluginAdminView {...props} />;
}
