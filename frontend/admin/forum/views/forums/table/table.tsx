"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { Admin__Forum_Forums__ShowQuery } from "@/graphql/hooks";
import type { ShowForumForumsAdminWithChildren } from "./hooks/use-forum-forums-admin-api";

const Content = lazy(() =>
  import("./content-table").then(module => ({
    default: module.ContentTableForumsForumAdmin
  }))
);

export const TableForumsForumAdmin = ({
  admin__forum_forums__show: { edges }
}: Admin__Forum_Forums__ShowQuery) => {
  const initData: ShowForumForumsAdminWithChildren[] = edges.map(item => ({
    ...item,
    children:
      item.children.length > 0
        ? (item.children as unknown as ShowForumForumsAdminWithChildren[]) // Convert to the correct type, drizzle don't support recursive types
        : []
  }));

  return (
    <Suspense fallback={<Loader />}>
      <Content initData={initData} />
    </Suspense>
  );
};
