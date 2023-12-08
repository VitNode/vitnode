'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTableForumsForumAdmin = lazy(() =>
  import('./content-table').then(module => ({
    default: module.ContentTableForumsForumAdmin
  }))
);

export const TableForumsForumAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableForumsForumAdmin />
    </Suspense>
  );
};
