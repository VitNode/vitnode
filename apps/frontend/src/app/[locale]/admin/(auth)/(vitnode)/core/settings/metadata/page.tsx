import {
  generateMetadataManifestMetadataCoreAdmin,
  ManifestMetadataCoreAdminView,
} from 'vitnode-frontend/views/admin/views/core/settings/metadata/manifest/manifest-metadata-core-view';

export const generateMetadata = generateMetadataManifestMetadataCoreAdmin;

export default function Page() {
  return <ManifestMetadataCoreAdminView />;
}
