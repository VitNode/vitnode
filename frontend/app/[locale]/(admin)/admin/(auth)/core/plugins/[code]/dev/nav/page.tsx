import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { CreateNavDevPluginAdmin } from "@/admin/core/views/core/plugins/views/dev/nav/create/create";
import { NavDevPluginAdminView } from "@/admin/core/views/core/plugins/views/dev/nav/nav";
import { HeaderContent } from "@/components/header-content/header-content";
import {
  Admin__Core_Plugins__Nav__Show,
  Admin__Core_Plugins__Nav__ShowQuery,
  Admin__Core_Plugins__Nav__ShowQueryVariables
} from "@/utils/graphql/hooks";
import { fetcher } from "@/utils/graphql/fetcher";

interface Props {
  params: {
    code: string;
  };
}

const getData = async (
  variables: Admin__Core_Plugins__Nav__ShowQueryVariables
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Nav__ShowQuery,
    Admin__Core_Plugins__Nav__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Nav__Show,
    variables
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.plugins.dev.nav");

  return {
    title: t("title")
  };
}

export default async function Page({ params: { code } }: Props) {
  const data = await getData({ pluginCode: code });
  const t = await getTranslations("admin.core.plugins.dev.nav");

  return (
    <>
      <HeaderContent h1={t("title")}>
        <CreateNavDevPluginAdmin />
      </HeaderContent>

      <NavDevPluginAdminView {...data} />
    </>
  );
}
