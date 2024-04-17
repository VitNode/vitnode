import { getTranslations } from "next-intl/server";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { ManifestMetadataCoreView } from "@/admin/core/views/core/metadata/manifest/manifest-metadata-core-view";
import { fetcher } from "@/graphql/fetcher";
import {
  Admin__Core_Manifest_Metadata__Show,
  type Admin__Core_Manifest_Metadata__ShowQuery,
  type Admin__Core_Manifest_Metadata__ShowQueryVariables
} from "@/graphql/hooks";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Manifest_Metadata__ShowQuery,
    Admin__Core_Manifest_Metadata__ShowQueryVariables
  >({
    query: Admin__Core_Manifest_Metadata__Show
  });

  return data;
};

export default async function Page() {
  const t = await getTranslations("admin.core.metadata.manifest");
  const data = await getData();

  return (
    <>
      <HeaderContent h1={t("title")} desc={t("desc")} />

      <Card className="p-6">
        <ManifestMetadataCoreView {...data} />
      </Card>
    </>
  );
}
