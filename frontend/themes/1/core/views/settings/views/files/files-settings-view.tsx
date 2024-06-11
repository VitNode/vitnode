import { useTranslations } from "next-intl";
import * as React from "react";

import { CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Core_Members__Files__ShowQuery } from "@/graphql/hooks";
import { Loader } from "@/components/loader";

const ContentFilesSettings = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentFilesSettings
  }))
);

export default function FilesSettingsView(
  props: Core_Members__Files__ShowQuery
) {
  const t = useTranslations("core.settings.files");

  return (
    <>
      <CardHeader>
        <h1 className="text-2xl font-semibold leading-none tracking-tight">
          {t("title")}
        </h1>
        <CardDescription>{t("desc")}</CardDescription>
      </CardHeader>

      <CardContent>
        <React.Suspense fallback={<Loader />}>
          <ContentFilesSettings {...props} />
        </React.Suspense>
      </CardContent>
    </>
  );
}
