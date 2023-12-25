'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import type { UsersMembersAdminViewProps } from '../users-members-admin-view';

const ContentTableUsersMembersAdmin = lazy(() =>
  import('./content-table-users-members-admin').then(module => ({
    default: module.ContentTableUsersMembersAdmin
  }))
);

export const TableUsersMembersAdmin = (props: UsersMembersAdminViewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableUsersMembersAdmin {...props} />
    </Suspense>
  );
};
