import { useState } from "react";

import { type ShowForumForumsAdmin } from "@/graphql/hooks";

export interface Admin__Forum_Forums__ShowQueryItem
  extends Omit<ShowForumForumsAdmin, "parent" | "permissions"> {}

export interface ShowForumForumsAdminWithChildren
  extends Omit<ShowForumForumsAdmin, "children"> {
  children: ShowForumForumsAdminWithChildren[];
}

interface Args {
  initData: ShowForumForumsAdminWithChildren[];
}

export const useForumForumsAdminAPI = ({ initData }: Args) => {
  const [data, setData] =
    useState<ShowForumForumsAdminWithChildren[]>(initData);

  return {
    data,
    setData
  };
};
