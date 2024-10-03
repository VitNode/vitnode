import { Icon } from '@/components/icon/icon';
import { TranslationsProvider } from '@/components/translations-provider';
import { getSessionAdminData } from '@/graphql/get-session-admin-data';
import { redirect } from '@/navigation';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { AsideAuthAdmin } from './auth/aside/aside';
import { HeaderAdmin } from './auth/header/header';
import { AdminProviders } from './providers';

export interface TextAndIconsAsideAdmin {
  icon: null | React.ReactNode;
  id: string;
  parent_text?: string;
  plugin: string;
  text: string;
}

export const generateMetadataAdminLayout = async (): Promise<Metadata> => {
  const t = await getTranslations('admin.global');

  return {
    title: {
      default: t('title_short'),
      template: `%s - ${t('title_short')}`,
    },
  };
};

export const AdminLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  try {
    const [t, data] = await Promise.all([
      getTranslations(),
      getSessionAdminData(),
    ]);

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
      <TranslationsProvider namespaces="admin.global">
        <AdminProviders data={data}>
          <AsideAuthAdmin textsAndIcons={textsAndIcons} />
          <HeaderAdmin textsAndIcons={textsAndIcons} />
          <main className="text-card-foreground mt-16 px-2 py-6 md:my-0 md:ml-[240px] md:mt-0 md:px-6 lg:px-10 xl:ml-[260px]">
            <div className="container">{children}</div>
          </main>
        </AdminProviders>
      </TranslationsProvider>
    );
  } catch (err) {
    if (err instanceof Error && err.message === 'ACCESS_DENIED') {
      redirect('/admin');
    }

    throw err;
  }
};
