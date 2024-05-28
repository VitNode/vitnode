import { useTranslations } from "next-intl";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";

export default function DevicesSettingsView() {
  const t = useTranslations("core.settings.devices");

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("title")}
        </h1>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent>DevicesSettingsView</CardContent>
    </>
  );
}
