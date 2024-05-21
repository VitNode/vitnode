import { useTranslations } from "next-intl";
import { Suspense, lazy } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader
} from "@/components/ui/card";
import type { Core_Members__Files__ShowQuery } from "@/graphql/hooks";
import { Loader } from "@/components/loader";

const ContentFilesSettings = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentFilesSettings
  }))
);

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
        <Suspense fallback={<Loader />}>
          <ContentFilesSettings {...props} />
        </Suspense>
      </CardContent>
    </Card>
  );
}
