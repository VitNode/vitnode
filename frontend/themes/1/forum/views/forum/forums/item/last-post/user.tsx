"use client";

import { UserLink } from "@/components/user/link/user-link";
import type { User } from "@/graphql/hooks";

export const UserLastPostItemForum = (user: User) => {
  return (
    <UserLink
      className="font-medium"
      onClick={e => e.stopPropagation()}
      user={user}
    />
  );
};
