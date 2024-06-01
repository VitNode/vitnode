import { NavWrapper } from "./wrapper";
import { getSessionData } from "@/functions/get-session-data";
import { NavListWrapper } from "./list-wrapper";
import { ItemNav } from "./item";
import { Icon } from "@/components/icon/icon";

export const Nav = async () => {
  const { data } = await getSessionData();

  return (
    <NavWrapper>
      <div className="flex-1 overflow-x-auto h-full p-1 flex">
        <NavListWrapper>
          {data.core_nav__show.edges.map(nav => {
            return (
              <ItemNav
                key={nav.id}
                {...nav}
                icon={
                  nav.icon ? <Icon className="size-4" name={nav.icon} /> : null
                }
              />
            );
          })}
        </NavListWrapper>
      </div>
    </NavWrapper>
  );
};
