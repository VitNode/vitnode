'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTableLangsCoreAdmin = lazy(() =>
  import('./content-table-langs-core-admin').then(module => ({
    default: module.ContentTableLangsCoreAdmin
  }))
);

export const TableLangsCoreAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableLangsCoreAdmin />
    </Suspense>
  );
};
