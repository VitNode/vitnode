'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTableGroupsUsersAdmin = lazy(() =>
  import('./content-table-groups-users-admin').then(module => ({
    default: module.ContentTableGroupsUsersAdmin
  }))
);

export const TableGroupsUsersAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableGroupsUsersAdmin />
    </Suspense>
  );
};
