import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";

export default function FilesSettingsView() {
  const t = useTranslations("core.settings.files");

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("title")}
        </h1>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent>Not implemented!</CardContent>
    </Card>
  );
}
