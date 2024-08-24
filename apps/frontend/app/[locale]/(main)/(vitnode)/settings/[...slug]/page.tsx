import { SlugViewProps } from 'vitnode-frontend/views/slug';
import {
  generateMetadataSlugSettings,
  SlugSettingsView,
} from 'vitnode-frontend/views/theme/views/settings/slug';

export const generateMetadata = generateMetadataSlugSettings;

export default function Page(props: SlugViewProps) {
  return <SlugSettingsView {...props} />;
}
