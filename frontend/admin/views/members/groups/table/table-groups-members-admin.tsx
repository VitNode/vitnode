'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTableGroupsMembersAdmin = lazy(() =>
  import('./content-table-groups-members-admin').then(module => ({
    default: module.ContentTableGroupsMembersAdmin
  }))
);

export const TableGroupsMembersAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableGroupsMembersAdmin />
    </Suspense>
  );
};
