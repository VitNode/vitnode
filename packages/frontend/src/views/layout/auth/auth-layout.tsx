import { getGlobalData } from '@/graphql/get-global-data';
import { getSessionData } from '@/graphql/get-session-data';
import { getLocale } from 'next-intl/server';
import React from 'react';

import { redirect } from '../../../navigation';
import { AuthProviders } from './providers';

export const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, { core_languages__show }, locale] = await Promise.all([
    getSessionData(),
    getGlobalData(),
    getLocale(),
  ]);

  // TODO: Improve this check, make this based on the users count
  if (core_languages__show.edges.length === 0) {
    redirect({ href: '/admin/install', locale });
  }

  return <AuthProviders data={data}>{children}</AuthProviders>;
};
