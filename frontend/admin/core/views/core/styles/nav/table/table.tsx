"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader";
import type { Admin__Core_Nav__ShowQuery } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then((module) => ({
    default: module.ContentTableContentNavAdmin
  }))
);

export const TableNavAdmin = (props: Admin__Core_Nav__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
