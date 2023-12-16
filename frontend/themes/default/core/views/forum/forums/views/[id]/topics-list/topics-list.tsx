'use client';

import { Suspense, lazy } from 'react';

import { Loader } from '@/components/loader/loader';
import { TopicsListForumProps } from './content';

const ContentTopicsListForum = lazy(() =>
  import('./content').then(module => ({
    default: module.ContentTopicsListForum
  }))
);

export const TopicsListForum = (props: TopicsListForumProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTopicsListForum {...props} />
    </Suspense>
  );
};
