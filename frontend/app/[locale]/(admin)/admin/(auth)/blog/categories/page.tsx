import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CategoriesBlogAdminView } from "@/admin/blog/views/categories/categories-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog.admin.categories");

  return {
    title: t("title")
  };
}

export default function Page() {
  return <CategoriesBlogAdminView />;
}
