"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import type { Core_Plugins__Admin__ShowQuery } from "@/graphql/hooks";

const ContentTablePluginsAdmin = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTablePluginsAdmin
  }))
);

export const TablePluginsAdmin = (props: Core_Plugins__Admin__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <ContentTablePluginsAdmin {...props} />
    </Suspense>
  );
};
