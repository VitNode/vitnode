"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { Admin_Core_Themes__ShowQuery } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentTableThemesAdmin
  }))
);

export const TableThemesAdmin = (props: Admin_Core_Themes__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
