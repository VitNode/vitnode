import React from 'react';
import {
  SignInView,
  generateMetadataSignIn,
} from 'vitnode-frontend/views/theme/views/auth/sign/in/sign-in-view';

export const generateMetadata = generateMetadataSignIn;

export default async function Page() {
  return <SignInView />;
}
