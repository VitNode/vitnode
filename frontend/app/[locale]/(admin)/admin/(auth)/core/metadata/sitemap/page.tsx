import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.metadata.sitemap");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const t = await getTranslations("admin.core.metadata.sitemap");

  return (
    <>
      <HeaderContent h1={t("title")} desc={t("desc")} />

      <Card className="p-6">Not implemented yet</Card>
    </>
  );
}
