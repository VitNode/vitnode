import { flattenTree } from 'vitnode-frontend/helpers/flatten-tree';
import { getSessionData } from 'vitnode-frontend/graphql/get-session-data';
import { Icon } from 'vitnode-frontend/components/icon/icon';

import { QuickMenuWrapper } from './wrapper';
import { ButtonDrawer } from './drawer/button';
import { ShowCoreNav } from '@/graphql/hooks';

export const QuickMenu = async () => {
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

  const navIcons: {
    icon: React.ReactNode;
    id: number;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-4" name={item.icon} /> : null,
    id: item.id,
  }));

  return (
    <div className="supports-backdrop-blur:bg-background/60 bg-card/75 fixed bottom-0 z-20 flex w-full border-t backdrop-blur sm:hidden">
      <QuickMenuWrapper>
        <ButtonDrawer navIcons={navIcons} />
      </QuickMenuWrapper>
    </div>
  );
};
