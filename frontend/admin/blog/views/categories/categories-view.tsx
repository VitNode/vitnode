import { useTranslations } from "next-intl";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CategoriesBlogAdminView = () => {
  const t = useTranslations("blog.admin.categories");

  return (
    <Card>
      <CardHeader>
        <HeaderContent h1={t("title")}>test</HeaderContent>
      </CardHeader>

      <CardContent>
        Hi from blog page for categories, but from template!
      </CardContent>
    </Card>
  );
};
