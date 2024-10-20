import { getGlobalData } from '@/graphql/get-global-data';
import { getSessionData } from '@/graphql/get-session-data';
import React from 'react';

import { redirect } from '../../../navigation';
import { AuthProviders } from './providers';

export const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, { core_languages__show }] = await Promise.all([
    getSessionData(),
    getGlobalData(),
  ]);

  // TODO: Improve this check, make this based on the users count
  if (core_languages__show.edges.length === 0) {
    await redirect('/admin/install');
  }

  return <AuthProviders data={data}>{children}</AuthProviders>;
};
