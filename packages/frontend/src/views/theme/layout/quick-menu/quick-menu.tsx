import { QuickMenuWrapper } from './wrapper';
import { ButtonDrawer } from './drawer/button';
import { flattenTree } from '@/helpers/flatten-tree';
import { getSessionData } from '@/graphql/get-session-data';
import { Icon } from '@/components/icon/icon';
import { ShowCoreNav } from '@/graphql/types';
import { cn } from '@/helpers/classnames';

export const QuickMenu = async ({ className }: { className?: string }) => {
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

  const navIcons: {
    icon: React.ReactNode;
    id: number;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-4" name={item.icon} /> : null,
    id: item.id,
  }));

  return (
    <div
      className={cn(
        'supports-backdrop-blur:bg-background/60 bg-card/75 fixed bottom-0 z-20 flex w-full border-t backdrop-blur sm:hidden',
        className,
      )}
    >
      <QuickMenuWrapper>
        <ButtonDrawer navIcons={navIcons} />
      </QuickMenuWrapper>
    </div>
  );
};
