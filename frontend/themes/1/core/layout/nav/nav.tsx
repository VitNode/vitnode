import { NavWrapper } from "./wrapper";
import { getSessionData } from "@/functions/get-session-data";
import { NavListWrapper } from "./list-wrapper";
import { ItemNav } from "./item";
import { Icon } from "@/components/icon/icon";
import { flattenTree } from "@/functions/flatten-tree";
import { ShowCoreNav } from "@/utils/graphql/hooks";

export const Nav = async () => {
  const { data } = await getSessionData();

  const flattenData = flattenTree<ShowCoreNav>({
    tree: data.core_nav__show.edges.map(nav => ({
      ...nav,
      children: nav.children.map(child => ({
        ...child,
        children: []
      }))
    }))
  });

  const icons: {
    icon: React.ReactNode;
    id: number;
  }[] = flattenData.map(item => ({
    icon: item.icon ? <Icon className="size-4" name={item.icon} /> : null,
    id: item.id
  }));

  return (
    <NavWrapper>
      <div className="flex-1 overflow-x-auto h-full p-1 flex">
        <NavListWrapper>
          {data.core_nav__show.edges.map(nav => {
            return <ItemNav key={nav.id} {...nav} icons={icons} />;
          })}
        </NavListWrapper>
      </div>
    </NavWrapper>
  );
};
