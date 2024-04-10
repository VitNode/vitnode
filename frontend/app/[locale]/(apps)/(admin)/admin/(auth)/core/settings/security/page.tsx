import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";

export default async function Page() {
  const t = await getTranslations("admin.core.settings.security");

  return (
    <>
      <HeaderContent h1={t("title")} />

      <Card className="p-6">Not implemented yet</Card>
    </>
  );
}
