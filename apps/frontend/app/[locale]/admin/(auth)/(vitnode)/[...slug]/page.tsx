import {
  SlugAdminView,
  generateMetadataSlugAdmin,
} from 'vitnode-frontend/views/admin/views/slug';
import { SlugViewProps } from 'vitnode-frontend/views/slug';

export const generateMetadata = generateMetadataSlugAdmin;

export default function Page(props: SlugViewProps) {
  return <SlugAdminView {...props} />;
}
