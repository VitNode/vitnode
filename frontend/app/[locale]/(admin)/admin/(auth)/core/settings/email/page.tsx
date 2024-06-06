import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("core.admin.nav");

  return {
    title: t("settings_email")
  };
}

export default async function Page() {
  const [t] = await Promise.all([getTranslations("core.admin.nav")]);

  return (
    <>
      <HeaderContent h1={t("settings_email")} />

      <Card className="p-6">Test</Card>
    </>
  );
}
