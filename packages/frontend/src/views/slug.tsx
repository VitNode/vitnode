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
import {
  generateMetadataItemLegal,
  ItemLegalView,
} from './theme/views/legal/item/item-legal-view';
import {
  generateMetadataLegal,
  LegalView,
} from './theme/views/legal/legal-view';
import { ProfileView } from './theme/views/profile/profile-view';

export interface SlugViewProps {
  params: { locale: string; slug: string[] };
  searchParams: Record<string, unknown>;
}

export const generateMetadataSlug = async (
  props: SlugViewProps,
): Promise<Metadata> => {
  const {
    params: { slug },
  } = props;

  if (!slug[1]) {
    if (slug[0] === 'login') return generateMetadataSignIn();
    if (slug[0] === 'register') return generateMetadataSignUp();
  }

  if (!slug[2]) {
    if (slug[0] === 'legal' && !slug[1]) return generateMetadataLegal();
    if (slug[0] === 'legal' && slug[1])
      return generateMetadataItemLegal({ code: slug[1], ...props });
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

  if (!slug[2]) {
    if (slug[0] === 'legal' && !slug[1]) return <LegalView />;
    if (slug[0] === 'legal' && slug[1])
      return <ItemLegalView code={slug[1]} {...props} />;
  }

  return notFound();
};
