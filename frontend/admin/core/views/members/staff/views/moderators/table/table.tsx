"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import type { ModeratorsStaffAdminViewProps } from "../moderators-view";

const ContentTableModeratorsStaffAdmin = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTableModeratorsStaffAdmin
  }))
);

export const TableModeratorsStaffAdmin = (
  props: ModeratorsStaffAdminViewProps
) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableModeratorsStaffAdmin {...props} />
    </Suspense>
  );
};
