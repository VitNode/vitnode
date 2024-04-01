"use client";

import { UserLink } from "@/components/user/link/user-link";
import type { User } from "@/graphql/hooks";

export const UserLastPostItemForum = (user: User): JSX.Element => {
  return <UserLink onClick={(e): void => e.stopPropagation()} user={user} />;
};
