import { getSessionAdminData } from '@/graphql/get-session-admin';

import { ItemNavAdmin } from './item/item';
import { NavAdminWrapper } from './wrapper';

export const NavAdmin = async () => {
  const data = await getSessionAdminData();

  return (
    <NavAdminWrapper>
      {data.admin__nav__show.map(item => (
        <ItemNavAdmin
          id={item.code}
          items={item.nav.map(navItem => ({
            id: navItem.code,
            icon: navItem.icon ?? undefined,
            children: navItem.children?.map(child => ({
              id: child.code,
            })),
          }))}
          key={item.code}
        />
      ))}
    </NavAdminWrapper>
  );
};
