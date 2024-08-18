import { ItemNav } from './item';
import { getSessionData } from '@/graphql/get-session-data';
import { flattenTree } from '@/helpers/flatten-tree';
import { Icon } from '@/components/icon/icon';
import { ShowCoreNav } from '@/graphql/types';
import { NavWrapper } from './wrapper';

export const Nav = async () => {
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
      <nav className="hidden gap-2 sm:flex">
        {data.core_nav__show.edges.map(nav => {
          return <ItemNav key={nav.id} {...nav} icons={icons} />;
        })}
      </nav>
    </NavWrapper>
  );
};
