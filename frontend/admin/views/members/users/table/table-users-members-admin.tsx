'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTableUsersMembersAdmin = lazy(() =>
  import('./content-table-users-members-admin').then(module => ({
    default: module.ContentTableUsersMembersAdmin
  }))
);

export const TableUsersMembersAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableUsersMembersAdmin />
    </Suspense>
  );
};
