import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

import { FilesAdvancedCoreAdminView } from "@/admin/core/views/core/advanced/files/files-advanced-core-adminpview";
import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.advanced.files");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const t = await getTranslations("admin.core.advanced.files");

  return (
    <>
      <HeaderContent h1={t("title")} />

      <Card className="p-6">
        <FilesAdvancedCoreAdminView />
      </Card>
    </>
  );
}
