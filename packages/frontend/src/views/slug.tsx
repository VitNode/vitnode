import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  generateMetadataSignIn,
  SignInView,
} from './theme/views/auth/sign/in/sign-in-view';
import {
  generateMetadataSignUp,
  SignUpView,
} from './theme/views/auth/sign/up/sign-up-view';
import { ProfileView } from './theme/views/profile/profile-view';

export interface SlugViewProps {
  params: { locale: string; slug: string[] };
  searchParams: Record<string, unknown>;
}

export const generateMetadataSlug = async ({
  params: { slug },
}: SlugViewProps): Promise<Metadata> => {
  switch (slug[0]) {
    case 'login':
      return generateMetadataSignIn();
    case 'register':
      return generateMetadataSignUp();
  }

  return {};
};

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
