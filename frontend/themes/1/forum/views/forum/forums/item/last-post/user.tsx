"use client";

import { UserLink } from "@/components/user/link/user-link";
import { User } from "@/utils/graphql/hooks";

export const UserLastPostItemForum = (user: User) => {
  return (
    <UserLink
      className="font-medium"
      onClick={e => e.stopPropagation()}
      user={user}
    />
  );
};
