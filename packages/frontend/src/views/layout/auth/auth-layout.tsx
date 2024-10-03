import { getGlobalData } from '@/graphql/get-global-data';
import { getSessionData } from '@/graphql/get-session-data';
import React from 'react';

import { redirect } from '../../../navigation';
import { AuthProviders } from './providers';

export const AuthLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const [data, { core_languages__show }] = await Promise.all([
    getSessionData(),
    getGlobalData(),
  ]);

  // TODO: Improve this check, make this based on the users count
  if (core_languages__show.edges.length === 0) {
    redirect({ href: '/admin/install', locale });
  }

  return <AuthProviders data={data}>{children}</AuthProviders>;
};
