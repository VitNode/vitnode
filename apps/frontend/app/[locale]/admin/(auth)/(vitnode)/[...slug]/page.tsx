import {
  SlugAdminView,
  generateMetadataSlugAdmin,
  SlugAdminViewProps,
} from 'vitnode-frontend/views/admin/views/slug';

export const generateMetadata = generateMetadataSlugAdmin;

export default function Page(props: SlugAdminViewProps) {
  return <SlugAdminView {...props} />;
}
