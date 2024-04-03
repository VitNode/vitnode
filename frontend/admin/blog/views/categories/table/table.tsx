import { Loader } from "lucide-react";
import { Suspense, lazy } from "react";

import type { Admin_Blog_Categories__ShowQuery } from "@/graphql/hooks";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentTableForumsForumAdmin
  }))
);

export const TableCategoriesCategoryAdmin = (
  props: Admin_Blog_Categories__ShowQuery
) => {
  return (
    <Suspense fallback={<Loader />}>
      <Content {...props} />
    </Suspense>
  );
};
