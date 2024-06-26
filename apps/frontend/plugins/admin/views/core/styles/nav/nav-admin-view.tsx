import { useTranslations } from 'next-intl';
import * as React from 'react';
import { flattenTree } from 'vitnode-frontend/helpers/flatten-tree';
import { Card } from 'vitnode-frontend/components/ui/card';

import { HeaderContent } from '@/components/header-content/header-content';
import { TableNavAdmin } from './table/table';
import { Admin__Core_Nav__ShowQuery, ShowCoreNav } from '@/graphql/hooks';
import { ActionsNavAdmin } from './actions/actions';
import { Icon } from '@/components/icon/icon';

export const NavAdminView = (props: Admin__Core_Nav__ShowQuery) => {
  const t = useTranslations('admin.core.styles.nav');

  const flattenData = flattenTree<ShowCoreNav>({
    tree: props.core_nav__show.edges.map(nav => ({
      ...nav,
      children: nav.children.map(child => ({
        ...child,
        children: [],
      })),
    })),
  });

  const icons: {
    icon: React.ReactNode;
    id: number;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-4" name={item.icon} /> : null,
    id: item.id,
  }));

  return (
    <>
      <HeaderContent h1={t('title')}>
        <ActionsNavAdmin />
      </HeaderContent>

      <Card className="p-6">
        <TableNavAdmin {...props} icons={icons} />
      </Card>
    </>
  );
};
