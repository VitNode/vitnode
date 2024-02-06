import { useTranslations } from "next-intl";

import { CardDescription, CardHeader } from "@/components/ui/card";

export const HeaderNotificationsSettings = () => {
  const t = useTranslations("core");

  return (
    <CardHeader>
      <h1 className="text-2xl font-semibold leading-none tracking-tight">
        {t("settings.notifications.title")}
      </h1>
      <CardDescription>{t("settings.notifications.desc")}</CardDescription>
    </CardHeader>
  );
};
