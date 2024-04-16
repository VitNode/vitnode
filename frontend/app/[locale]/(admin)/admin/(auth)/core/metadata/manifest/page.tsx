import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { ManifestMetadataCoreView } from "@/admin/core/views/core/metadata/manifest/manifest-metadata-core-view";

export default async function Page() {
  const t = await getTranslations("admin.core.metadata.manifest");

  return (
    <>
      <HeaderContent h1={t("title")} desc={t("desc")} />

      <Card className="p-6">
        <ManifestMetadataCoreView />
      </Card>
    </>
  );
}
