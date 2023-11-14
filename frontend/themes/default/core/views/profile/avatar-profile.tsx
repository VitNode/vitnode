'use client';

import { AvatarUser } from '@/components/user/avatar/avatar-user';
import { useProfileView } from '@/hooks/core/profiles/use-profile-view';
import { Skeleton } from '@/components/ui/skeleton';

export const AvatarProfile = () => {
  const { data, isLoading } = useProfileView();

  if (isLoading) {
    return (
      <div className="border-card border-4 rounded-full">
        <Skeleton className="w-32 h-32 rounded-full flex-shrink-0" />
      </div>
    );
  }

  if (!data) return null;

  return <AvatarUser className="border-card border-4" sizeInRem={8} {...data} />;
};
