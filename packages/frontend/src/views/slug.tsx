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
  if (!slug[1]) {
    if (slug[0] === 'login') return generateMetadataSignIn();
    if (slug[0] === 'register') return generateMetadataSignUp();
  }

  return {};
};

export const SlugView = (props: SlugViewProps) => {
  const {
    params: { slug },
  } = props;

  if (slug[0] === 'profile' && slug[1] && !slug[2])
    return <ProfileView id={slug[1]} />;

  if (!slug[1]) {
    if (slug[0] === 'login') return <SignInView />;
    if (slug[0] === 'register') return <SignUpView />;
  }

  return notFound();
};
