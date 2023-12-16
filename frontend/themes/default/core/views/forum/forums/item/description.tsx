'use client';

import { Suspense, lazy } from 'react';

import { TextLanguage } from '@/graphql/hooks';
import { Skeleton } from '@/components/ui/skeleton';

const ReadOnlyEditor = lazy(() =>
  import('@/components/editor/read-only/read-only-editor').then(module => ({
    default: module.ReadOnlyEditor
  }))
);

interface Props {
  description: TextLanguage[];
  id: string;
}

export const DescriptionItemForum = ({ description, id }: Props) => {
  return (
    <Suspense fallback={<Skeleton className="h-4 w-60" />}>
      <ReadOnlyEditor
        id={`${id}_description`}
        className="text-muted-foreground text-sm [&_p]:m-0"
        value={description}
      />
    </Suspense>
  );
};
