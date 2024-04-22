import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import { ContentFilesSettings } from "./content";
import type { Core_Members__Files__ShowQuery } from "@/graphql/hooks";

export default function FilesSettingsView(
  props: Core_Members__Files__ShowQuery
) {
  const t = useTranslations("core.settings.files");

  return (
    <Card>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("title")}
        </h1>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent>
        <ContentFilesSettings {...props} />
      </CardContent>
    </Card>
  );
}
