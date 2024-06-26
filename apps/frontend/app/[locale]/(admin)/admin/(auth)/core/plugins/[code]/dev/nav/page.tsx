import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { flattenTree } from "vitnode-frontend/helpers/flatten-tree";
import { fetcher } from "vitnode-frontend/helpers/fetcher";

import { HeaderContent } from "@/components/header-content/header-content";
import {
  Admin__Core_Plugins__Nav__Show,
  Admin__Core_Plugins__Nav__ShowQuery,
  Admin__Core_Plugins__Nav__ShowQueryVariables,
  ShowAdminNavPluginsObj,
} from "@/graphql/hooks";
import { NavDevPluginAdminView } from "@/plugins/admin/views/core/plugins/views/dev/nav/nav";
import { CreateNavDevPluginAdmin } from "@/plugins/admin/views/core/plugins/views/dev/nav/actions/create/create";
import { Icon } from "@/components/icon/icon";

interface Props {
  params: {
    code: string;
  };
}

const getData = async (
  variables: Admin__Core_Plugins__Nav__ShowQueryVariables,
) => {
  const { data } = await fetcher<
    Admin__Core_Plugins__Nav__ShowQuery,
    Admin__Core_Plugins__Nav__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Nav__Show,
    variables,
  });

  return data;
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("admin.core.plugins.dev.nav");

  return {
    title: t("title"),
  };
}

export default async function Page({ params: { code } }: Props) {
  const data = await getData({ pluginCode: code });
  const t = await getTranslations("admin.core.plugins.dev.nav");

  const flattenData = flattenTree<ShowAdminNavPluginsObj>({
    tree: data.admin__core_plugins__nav__show.map(nav => ({
      id: nav.code,
      ...nav,
      children:
        nav.children?.map(child => ({
          id: `${nav.code}_${child.code}`,
          ...child,
          children: [],
        })) ?? [],
    })),
  });

  const icons: {
    icon: React.ReactNode;
    id: string;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-4" name={item.icon} /> : null,
    id: item.id.toString(),
  }));

  return (
    <>
      <HeaderContent h1={t("title")}>
        <CreateNavDevPluginAdmin
          dataFromSSR={data.admin__core_plugins__nav__show}
          icons={icons}
        />
      </HeaderContent>

      <NavDevPluginAdminView {...data} icons={icons} />
    </>
  );
}
