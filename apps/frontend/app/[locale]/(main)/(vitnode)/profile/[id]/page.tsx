import React from 'react';
import {
  ProfileView,
  ProfileViewProps,
} from 'vitnode-frontend/views/theme/views/profile/profile-view';

export default function Page(params: ProfileViewProps) {
  return <ProfileView {...params} />;
}
