import { Icon } from '@/components/icon/icon';
import { HeaderContent } from '@/components/ui/header-content';
import { fetcher } from '@/graphql/fetcher';
import {
  Admin__Core_Plugins__Nav__Show,
  Admin__Core_Plugins__Nav__ShowQuery,
  Admin__Core_Plugins__Nav__ShowQueryVariables,
} from '@/graphql/queries/admin/plugins/dev/nav/admin__core_plugins__nav__show.generated';
import { TextAndIconsAsideAdmin } from '@/views/admin/layout/admin-layout';
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

export const NavDevPluginAdminView = async ({
  params,
}: {
  params: Promise<{ code: string }>;
}) => {
  const { code } = await params;
  const [data, t, tGlobal] = await Promise.all([
    getData({ pluginCode: code }),
    getTranslations('admin.core.plugins.dev.nav'),
    getTranslations(),
  ]);

  // Flat map to remove children
  const nav: {
    code: string;
    icon?: string;
    parent_icon?: string;
    parent_nav_code?: string;
    plugin: string;
  }[] = data.admin__core_plugins__nav__show.flatMap(nav => {
    const children = nav.children ?? [];
    const mappedChildren = children.map(child => ({
      parent_nav_code: nav.children ? nav.code : undefined,
      ...child,
      parent_icon: nav.icon,
      plugin: code,
    }));

    return [{ ...nav, plugin: code }, ...mappedChildren];
  });

  const textsAndIcons: TextAndIconsAsideAdmin[] = nav.map(item => {
    const id = item.parent_nav_code
      ? `${item.parent_nav_code}_${item.code}`
      : item.code;

    return {
      id,
      parent_text: item.parent_nav_code
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          tGlobal(`admin_${item.plugin}.nav.${item.parent_nav_code}`)
        : undefined,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      text: tGlobal(`admin_${item.plugin}.nav.${id}`),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      plugin: tGlobal(`admin_${item.plugin}.nav.title`),
      icon: item.icon ? <Icon name={item.icon} /> : null,
      plugin_code: item.plugin,
    };
  });

  return (
    <>
      <HeaderContent h1={t('title')}>
        <CreateNavDevPluginAdmin
          dataFromSSR={data.admin__core_plugins__nav__show}
          textsAndIcons={textsAndIcons}
        />
      </HeaderContent>

      <ContentNavDevPluginAdmin textsAndIcons={textsAndIcons} {...data} />
    </>
  );
};
