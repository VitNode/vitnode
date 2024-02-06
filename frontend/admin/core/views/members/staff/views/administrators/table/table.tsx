"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import type { AdministratorsStaffAdminViewProps } from "../administrators-view";

const ContentTableAdministratorsStaffAdmin = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTableAdministratorsStaffAdmin
  }))
);

export const TableAdministratorsStaffAdmin = (
  props: AdministratorsStaffAdminViewProps
) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTableAdministratorsStaffAdmin {...props} />
    </Suspense>
  );
};
