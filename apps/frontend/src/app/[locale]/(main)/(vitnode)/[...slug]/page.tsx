import {
  generateMetadataSlug,
  SlugView,
  SlugViewProps,
} from 'vitnode-frontend/views/slug';

export const generateMetadata = generateMetadataSlug;

export default function Page(props: SlugViewProps) {
  return <SlugView {...props} />;
}
