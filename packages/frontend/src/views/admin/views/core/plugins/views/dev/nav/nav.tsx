import { flattenTree } from '@/components/drag&drop/sortable-list/flat';
import { Icon } from '@/components/icon/icon';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Show,
  Admin__Core_Plugins__Nav__ShowQuery,
  Admin__Core_Plugins__Nav__ShowQueryVariables,
} from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { ShowAdminNavPluginsObj } from '@/graphql/types';
import { getTranslations } from 'next-intl/server';

import { CreateNavDevPluginAdmin } from './actions/create/create';
import { ContentNavDevPluginAdmin } from './content';

const getData = async (
  variables: Admin__Core_Plugins__Nav__ShowQueryVariables,
) => {
  const data = await fetcher<
    Admin__Core_Plugins__Nav__ShowQuery,
    Admin__Core_Plugins__Nav__ShowQueryVariables
  >({
    query: Admin__Core_Plugins__Nav__Show,
    variables,
  });

  return data;
};

interface NavItem extends Omit<ShowAdminNavPluginsObj, 'children'> {
  children: NavItem[];
  id: string;
}

export interface NavDevPluginAdminViewProps {
  params: { code: string };
}

export const NavDevPluginAdminView = async ({
  params: { code },
}: NavDevPluginAdminViewProps) => {
  const [data, t] = await Promise.all([
    getData({ pluginCode: code }),
    getTranslations('admin.core.plugins.dev.nav'),
  ]);

  const flattenData = flattenTree<NavItem>(
    data.admin__core_plugins__nav__show.map(nav => ({
      id: nav.code,
      ...nav,
      children: (nav.children?.map(child => ({
        id: `${nav.code}_${child.code}`,
        ...child,
        children: [],
      })) ?? []) as NavItem[],
    })),
  );

  const icons: {
    icon: React.ReactNode;
    id: string;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-6" name={item.icon} /> : null,
    id: item.id.toString(),
  }));

  return (
    <>
      <HeaderContent h1={t('title')}>
        <CreateNavDevPluginAdmin
          dataFromSSR={data.admin__core_plugins__nav__show}
          icons={icons}
        />
      </HeaderContent>

      <ContentNavDevPluginAdmin {...data} icons={icons} />
    </>
  );
};
