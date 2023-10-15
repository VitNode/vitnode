'use client';

import { CardHeader } from '@/components/ui/card';
import { useSession } from '@/hooks/core/use-session';
import { ChangeAvatar } from './change-avatar/change-avatar';

export const HeaderOverviewSettings = () => {
  const { session } = useSession();
  if (!session) return null;

  const {
    authorization_core_sessions: { email, name }
  } = session;

  return (
    <CardHeader>
      <div className="flex flex-col gap-4 items-center sm:flex-row sm:gap-6">
        <ChangeAvatar />
        <div className="flex flex-col space-y-1 text-center sm:text-left">
          <h1 className="text-3xl font-medium leading-none">{name}</h1>
          <p className="leading-none text-muted-foreground">{email}</p>
        </div>
      </div>
    </CardHeader>
  );
};
