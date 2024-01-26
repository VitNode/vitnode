'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import type { Core_Themes__Admin__ShowQuery } from '@/graphql/hooks';

const Content = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentTableThemesAdmin
  }))
);

export const TableThemesAdmin = (props: Core_Themes__Admin__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
