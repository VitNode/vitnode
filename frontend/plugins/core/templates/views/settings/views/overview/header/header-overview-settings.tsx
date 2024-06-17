"use client";

import { CardHeader } from "@/components/ui/card";
import { useSession } from "@/plugins/core/hooks/use-session";
import { ChangeAvatar } from "./change-avatar/change-avatar";

export const HeaderOverviewSettings = () => {
  const { session } = useSession();
  if (!session) return null;
  const { email, name } = session;

  return (
    <CardHeader>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
        <ChangeAvatar />
        <div className="flex flex-col space-y-1 text-center sm:text-left">
          <h1 className="text-3xl font-medium leading-none">{name}</h1>
          <p className="text-muted-foreground leading-none">{email}</p>
        </div>
      </div>
    </CardHeader>
  );
};
