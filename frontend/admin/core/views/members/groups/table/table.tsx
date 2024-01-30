'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import type { GroupsMembersAdminViewProps } from '../groups-members-admin-view';

const ContentTableGroupsMembersAdmin = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentTableGroupsMembersAdmin
  }))
);

export const TableGroupsMembersAdmin = (props: GroupsMembersAdminViewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableGroupsMembersAdmin {...props} />
    </Suspense>
  );
};
