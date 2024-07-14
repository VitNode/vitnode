import {
  ManifestMetadataCoreAdminView,
  generateMetadataManifestMetadataCoreAdmin,
} from 'vitnode-frontend/admin/core/settings/metadata/manifest/manifest-metadata-core-view';

export const generateMetadata = generateMetadataManifestMetadataCoreAdmin;

export default function Page() {
  return <ManifestMetadataCoreAdminView />;
}
