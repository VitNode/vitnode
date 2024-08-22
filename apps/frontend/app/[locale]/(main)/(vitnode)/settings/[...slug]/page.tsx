import { SlugViewProps } from 'vitnode-frontend/views/slug';
import { SlugSettingsView } from 'vitnode-frontend/views/theme/views/settings/slug';

export default function Page(props: SlugViewProps) {
  return <SlugSettingsView {...props} />;
}
