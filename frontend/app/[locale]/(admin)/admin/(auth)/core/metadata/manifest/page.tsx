import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import { ManifestMetadataCoreAdminView } from "@/admin/core/views/core/metadata/manifest/manifest-metadata-core-view";
import {
  Admin__Core_Manifest_Metadata__Show,
  Admin__Core_Manifest_Metadata__ShowQuery,
  Admin__Core_Manifest_Metadata__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

const getData = async () => {
  const { data } = await fetcher<
    Admin__Core_Manifest_Metadata__ShowQuery,
    Admin__Core_Manifest_Metadata__ShowQueryVariables
  >({
    query: Admin__Core_Manifest_Metadata__Show
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.metadata.manifest");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const t = await getTranslations("admin.core.metadata.manifest");
  const data = await getData();

  return (
    <>
      <HeaderContent h1={t("title")} desc={t("desc")} />

      <Card className="p-6">
        <ManifestMetadataCoreAdminView {...data} />
      </Card>
    </>
  );
}
