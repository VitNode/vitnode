"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import type { Admin__Core_Plugins__ShowQuery } from "@/graphql/hooks";

const ContentTablePluginsAdmin = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTablePluginsAdmin
  }))
);

export const TablePluginsAdmin = (props: Admin__Core_Plugins__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTablePluginsAdmin {...props} />
    </Suspense>
  );
};
