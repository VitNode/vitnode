'use client';

import { useProfileView } from '@/hooks/core/profiles/use-profile-view';
import { Skeleton } from '@/components/ui/skeleton';
import { useTextLang } from '@/hooks/core/use-text-lang';

export const NameProfile = () => {
  const { data, isLoading } = useProfileView();
  const { convertText } = useTextLang();

  if (isLoading) {
    return (
      <>
        <Skeleton className="h-8 w-60" />
        <Skeleton className="h-6 w-40" />
      </>
    );
  }

  if (!data) return null;
  const { group, name } = data;

  return (
    <>
      <h1 className="font-semibold text-2xl">{name}</h1>
      <span>{convertText(group.name)}</span>
    </>
  );
};
