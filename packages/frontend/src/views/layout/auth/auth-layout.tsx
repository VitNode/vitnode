import React from 'react';

import { AuthProviders } from './providers';
import { getGlobalData } from '@/graphql/get-global-data';
import { getSessionData } from '@/graphql/get-session-data';

import { redirect } from '../../../navigation';

export const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, { core_languages__show }] = await Promise.all([
    getSessionData(),
    getGlobalData(),
  ]);

  // eslint-disable-next-line no-console
  console.log(core_languages__show, data);

  // TODO: Improve this check, make this based on the users count
  if (core_languages__show.edges.length === 0) {
    redirect('/admin/install');
  }

  return <AuthProviders data={data}>{children}</AuthProviders>;
};
