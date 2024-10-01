import { Icon } from '@/components/icon/icon';
import { LogoVitNode } from '@/components/logo-vitnode';
import { LanguageSwitcher } from '@/components/switchers/language-switcher';
import { ThemeSwitcher } from '@/components/switchers/theme-switcher';
import { getSessionAdminData } from '@/graphql/get-session-admin-data';
import { CONFIG } from '@/helpers/config-with-env';
import { Link } from '@/navigation';
import { getTranslations } from 'next-intl/server';

import { NavAdmin } from '../nav/nav-admin';
import { AvatarAsideAuthAdmin } from './avatar';
import { SearchAsideAuthAdmin } from './search/search';

export interface TextAndIconsAsideAdmin {
  icon: null | React.ReactNode;
  id: string;
  parent_text?: string;
  plugin: string;
  text: string;
}

export const AsideAuthAdmin = async () => {
  const t = await getTranslations();
  const data = await getSessionAdminData();

  // Flat map to remove children
  const nav: {
    code: string;
    icon?: string;
    parent_icon?: string;
    parent_nav_code?: string;
    plugin: string;
  }[] = data.admin__nav__show.flatMap(item => {
    const navParent = item.nav.flatMap(nav => ({
      code_plugin: item.code,
      ...nav,
      plugin: item.code,
    }));

    return navParent.flatMap(nav => {
      const children = nav.children ?? [];
      const mappedChildren = children.map(child => ({
        code_plugin: nav.code_plugin,
        parent_nav_code: nav.children ? nav.code : undefined,
        ...child,
        plugin: item.code,
        parent_icon: nav.icon,
      }));

      return [nav, ...mappedChildren];
    });
  });

  const textsAndIcons: TextAndIconsAsideAdmin[] = nav.map(item => {
    const id = item.parent_nav_code
      ? `${item.parent_nav_code}_${item.code}`
      : item.code;

    const getIcon = () => {
      if (item.parent_icon) return <Icon name={item.parent_icon} />;
      if (item.icon) return <Icon name={item.icon} />;

      return null;
    };

    return {
      id,
      parent_text: item.parent_nav_code
        ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          t(`admin_${item.plugin}.nav.${item.parent_nav_code}`)
        : undefined,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      text: t(`admin_${item.plugin}.nav.${id}`),
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      plugin: t(`admin_${item.plugin}.nav.title`),
      icon: getIcon(),
    };
  });

  return (
    <aside className="bg-card fixed left-0 top-0 z-30 hidden h-dvh flex-col border-e md:flex md:w-[240px] xl:w-[260px]">
      {CONFIG.node_development && (
        <div
          className="absolute left-0 top-0 z-50 h-1 w-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-55deg,#000, #000 20px, #ffb103 20px, #feb100 40px)',
          }}
        />
      )}

      <div className="space-y-2 px-4 pt-2 md:px-3 md:pt-4">
        <div className="flex flex-row items-center justify-between pb-2">
          <Link href="/admin/core/dashboard">
            <LogoVitNode className="h-8" small />
          </Link>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeSwitcher />

            <AvatarAsideAuthAdmin />
          </div>
        </div>

        <SearchAsideAuthAdmin textsAndIcons={textsAndIcons} />
      </div>

      <NavAdmin textsAndIcons={textsAndIcons} />
    </aside>
  );
};
