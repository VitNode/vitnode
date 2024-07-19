import React from 'react';
import {
  SignUpView,
  generateMetadataSignUp,
} from 'vitnode-frontend/views/theme/views/auth/sign/up/sign-up-view';

export const generateMetadata = generateMetadataSignUp;

export default async function Page() {
  return <SignUpView />;
}
