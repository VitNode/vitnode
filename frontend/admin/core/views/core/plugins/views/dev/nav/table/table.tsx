"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { Admin__Core_Plugins__Nav__ShowQuery } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentTableNavDevPluginAdmin
  }))
);

export const TableNavDevPluginAdmin = (
  props: Admin__Core_Plugins__Nav__ShowQuery
) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
