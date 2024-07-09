import * as React from 'react';
import { getTranslations } from 'next-intl/server';

import { TableNavAdmin } from './table/table';
import { ActionsNavAdmin } from './actions/actions';

import {
  Admin__Core_Nav__Show,
  Admin__Core_Nav__ShowQuery,
  Admin__Core_Nav__ShowQueryVariables,
  ShowCoreNav,
} from '@/graphql/graphql';
import { flattenTree } from '@/helpers/flatten-tree';
import { Icon } from '@/components/icon/icon';
import { HeaderContent } from '@/components/ui/header-content';
import { Card } from '@/components/ui/card';
import { fetcher } from '@/graphql/fetcher';

const getData = async () => {
  const data = await fetcher<
    Admin__Core_Nav__ShowQuery,
    Admin__Core_Nav__ShowQueryVariables
  >({
    query: Admin__Core_Nav__Show,
  });

  return data;
};

export const NavAdminView = async () => {
  const [data, t] = await Promise.all([
    getData(),
    getTranslations('admin.core.styles.nav'),
  ]);

  const flattenData = flattenTree<ShowCoreNav>({
    tree: data.core_nav__show.edges.map(nav => ({
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
        <TableNavAdmin {...data} icons={icons} />
      </Card>
    </>
  );
};
