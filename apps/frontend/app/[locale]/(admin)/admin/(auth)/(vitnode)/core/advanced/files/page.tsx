import {
  FilesAdvancedCoreAdminView,
  FilesAdvancedCoreAdminViewProps,
  generateMetadataFilesAdvancedCoreAdminView,
} from 'vitnode-frontend/admin/core/advanced/files/files-advanced-core-admin-view';

export const generateMetadata = generateMetadataFilesAdvancedCoreAdminView;

export default function Page(props: FilesAdvancedCoreAdminViewProps) {
  return <FilesAdvancedCoreAdminView {...props} />;
}
