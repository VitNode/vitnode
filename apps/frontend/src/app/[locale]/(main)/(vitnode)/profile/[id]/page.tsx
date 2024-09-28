import { ProfileView } from 'vitnode-frontend/views/theme/views/profile/profile-view';

export default function Page(props: React.ComponentProps<typeof ProfileView>) {
  return <ProfileView {...props} />;
}
