import { notFound } from 'next/navigation';

import { SignInView } from './auth/sign/in/sign-in-view';
import { SignUpView } from './auth/sign/up/sign-up-view';
import { ProfileView } from './profile/profile-view';

export interface SlugViewProps {
  params: { locale: string; slug: string[] };
  searchParams: Record<string, unknown>;
}

export const SlugView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  switch (slug[0]) {
    case 'login':
      return <SignInView />;
    case 'register':
      return <SignUpView />;
    case 'profile':
      if (slug[1]) {
        return <ProfileView id={slug[1]} />;
      }
  }

  return notFound();
};
