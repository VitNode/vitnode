import { getTranslations } from "next-intl/server";
import { Metadata } from "next";

import { HeaderContent } from "@/components/header-content/header-content";
import { Card } from "@/components/ui/card";
import {
  Core_Main_Settings__Show,
  Core_Main_Settings__ShowQuery,
  Core_Main_Settings__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";
import { MainSettingsCoreAdmin } from "@/plugins/admin/views/core/settings/main/main-settings-core-admin";

const getData = async () => {
  const { data } = await fetcher<
    Core_Main_Settings__ShowQuery,
    Core_Main_Settings__ShowQueryVariables
  >({
    query: Core_Main_Settings__Show
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.settings.main");

  return {
    title: t("title")
  };
}

export default async function Page() {
  const [t, data] = await Promise.all([
    getTranslations("admin.core.settings.main"),
    getData()
  ]);

  return (
    <>
      <HeaderContent h1={t("title")} />

      <Card className="p-6">
        <MainSettingsCoreAdmin {...data} />
      </Card>
    </>
  );
}
