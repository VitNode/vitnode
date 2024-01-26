'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import type { LangsCoreAdminViewProps } from '../langs-core-admin-view';

const ContentTableLangsCoreAdmin = lazy(() =>
  import('./content-table-langs-core-admin').then(module => ({
    default: module.ContentTableLangsCoreAdmin
  }))
);

export const TableLangsCoreAdmin = (props: LangsCoreAdminViewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableLangsCoreAdmin {...props} />
    </Suspense>
  );
};
