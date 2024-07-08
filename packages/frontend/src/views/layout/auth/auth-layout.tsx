import * as React from 'react';
import { isRedirectError } from 'next/dist/client/components/redirect';

import { AuthProviders } from './providers';

import { getSessionData } from '../../../graphql/get-session-data';
import { redirect } from '../../../navigation';
import { InternalErrorView } from '../../global';

interface Props {
  children: React.ReactNode;
}

export const AuthLayout = async ({ children }: Props) => {
  try {
    const data = await getSessionData();
    // TODO: Improve this check, make this based on the users count
    if (data.core_languages__show.edges.length === 0) {
      redirect('/admin/install');
    }

    return <AuthProviders data={data}>{children}</AuthProviders>;
  } catch (error) {
    // Redirect from catch
    if (isRedirectError(error)) {
      redirect('/admin/install');
    }

    return <InternalErrorView />;
  }
};
