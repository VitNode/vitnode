"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { UsersMembersAdminViewProps } from "../users-members-admin-view";

const ContentTableUsersMembersAdmin = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentTableUsersMembersAdmin
  }))
);

export const TableUsersMembersAdmin = (props: UsersMembersAdminViewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableUsersMembersAdmin {...props} />
    </Suspense>
  );
};
