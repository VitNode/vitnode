import { Icon } from '@/components/icon/icon';
import { getSessionData } from '@/graphql/get-session-data';
import { ShowCoreNav } from '@/graphql/types';
import { cn } from '@/helpers/classnames';
import { flattenTree } from '@/helpers/flatten-tree';

import { ItemNav } from './item';
import { NavWrapper } from './wrapper';

export const Nav = async ({ className }: { className?: string }) => {
  const data = await getSessionData();

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
    icon: item.icon ? <Icon name={item.icon} /> : null,
    id: item.id,
  }));

  return (
    <NavWrapper>
      <nav className={cn('hidden gap-2 sm:flex', className)}>
        {data.core_nav__show.edges.map(nav => {
          return <ItemNav key={nav.id} {...nav} icons={icons} />;
        })}
      </nav>
    </NavWrapper>
  );
};
