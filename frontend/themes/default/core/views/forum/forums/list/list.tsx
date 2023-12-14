'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';

const ContentListForumsForum = lazy(() =>
  import('./content-list').then(module => ({
    default: module.ContentListForumsForum
  }))
);

export const ListForumsForum = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentListForumsForum />
    </Suspense>
  );
};
