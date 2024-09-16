import {
  SlugDevPluginsAdminProps,
  SlugDevPluginsAdminView,
} from 'vitnode-frontend/views/admin/views/core/plugins/views/dev/slug';

export default function Page(props: SlugDevPluginsAdminProps) {
  return <SlugDevPluginsAdminView {...props} />;
}
