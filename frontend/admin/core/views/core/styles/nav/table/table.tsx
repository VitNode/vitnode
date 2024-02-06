"use client";

import { Suspense, lazy } from "react";

import { Loader } from "@/components/loader/loader";
import type { Core_Nav__Admin__ShowQuery } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTableContentNavAdmin
  }))
);

export const TableNavAdmin = (props: Core_Nav__Admin__ShowQuery) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
