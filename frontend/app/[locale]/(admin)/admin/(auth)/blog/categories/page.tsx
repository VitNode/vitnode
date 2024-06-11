import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CategoriesBlogAdminView } from "@/plugins/blog/admin/views/categories/categories-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin_Blog_Categories__Show,
  Admin_Blog_Categories__ShowQuery,
  Admin_Blog_Categories__ShowQueryVariables
} from "@/graphql/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { HeaderContent } from "@/components/header-content/header-content";
import { CreateCategoryBlogAdmin } from "@/plugins/blog/admin/views/categories/actions/create";

const getData = async () => {
  const { data } = await fetcher<
    Admin_Blog_Categories__ShowQuery,
    Admin_Blog_Categories__ShowQueryVariables
  >({
    query: Admin_Blog_Categories__Show,
    cache: "force-cache"
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.admin.categories");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const [t, data] = await Promise.all([
    getTranslations("blog.admin.categories"),
    getData()
  ]);

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>
          <CreateCategoryBlogAdmin />
        </HeaderContent>
      </CardHeader>

      <CardContent>
        <CategoriesBlogAdminView {...data} />
      </CardContent>
    </Card>
  );
}
