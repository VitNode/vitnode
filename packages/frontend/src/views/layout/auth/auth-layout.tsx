import { getSessionData } from '@/api/get-session-data';
import { InternalErrorView } from '@/views/global';
import React from 'react';

export const AuthLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    const data = await getSessionData();

    return <>{children}</>;
  } catch (_) {
    return <InternalErrorView />;
  }
};
