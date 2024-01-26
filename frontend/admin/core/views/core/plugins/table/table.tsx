'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentTablePluginsAdmin = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentTablePluginsAdmin
  }))
);

export const TablePluginsAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTablePluginsAdmin />
    </Suspense>
  );
};
