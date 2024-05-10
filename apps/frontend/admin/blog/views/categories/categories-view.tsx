import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CreateCategoryBlogAdmin } from "./actions/create";
import { TableCategoriesCategoryAdmin } from "./table/table";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Blog_Categories__Show,
  type Admin_Blog_Categories__ShowQuery,
  type Admin_Blog_Categories__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Admin_Blog_Categories__ShowQuery,
    Admin_Blog_Categories__ShowQueryVariables
  >({
    query: Admin_Blog_Categories__Show
  });

  return data;
};

export const CategoriesBlogAdminView = async () => {
  const t = await getTranslations("blog.admin.categories");
  const data = await getData();

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <CreateCategoryBlogAdmin />
        </HeaderContent>
      </CardHeader>

      <CardContent>
        <TableCategoriesCategoryAdmin {...data} />
      </CardContent>
    </Card>
  );
};
