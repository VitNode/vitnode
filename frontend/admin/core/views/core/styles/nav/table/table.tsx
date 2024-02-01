'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const Content = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentTableContentNavAdmin
  }))
);

export const TableContentNavAdmin = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Content />
    </Suspense>
  );
};
