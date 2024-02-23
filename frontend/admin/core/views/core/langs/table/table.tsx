"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { LangsCoreAdminViewProps } from "../langs-core-admin-view";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTableLangsCoreAdmin
  }))
);

export const TableLangsCoreAdmin = (props: LangsCoreAdminViewProps) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
