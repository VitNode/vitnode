import {
  FilesDevPluginAdminView,
  FilesDevPluginAdminViewProps,
} from 'vitnode-frontend/admin/core/plugins/views/dev/files-view';

export default function Page(props: FilesDevPluginAdminViewProps) {
  return <FilesDevPluginAdminView {...props} />;
}
