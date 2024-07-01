import { NavWrapper } from './wrapper';
import { NavListWrapper } from './list-wrapper';
import { ItemNav } from './item';

import { getSessionData } from '../../../../graphql/get-session-data';
import { flattenTree } from '../../../../helpers/flatten-tree';
import { Icon } from '../../../../components/icon/icon';
import { ShowCoreNav } from '../../../../graphql/graphql';

export const Nav = async () => {
  const { data } = await getSessionData();

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
    <NavWrapper>
      <div className="flex h-full flex-1 overflow-x-auto p-1">
        <NavListWrapper>
          {data.core_nav__show.edges.map(nav => {
            return (
              <ItemNav
                key={nav.id}
                {...nav}
                icons={icons}
                icon={<Icon className="size-4" name="House" />}
              />
            );
          })}
        </NavListWrapper>
      </div>
    </NavWrapper>
  );
};
