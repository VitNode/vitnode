import { ItemNavAdmin } from './item/item';
import { NavAdminWrapper } from './wrapper';
import { getSessionAdminData } from '@/graphql/get-session-admin';

export const NavAdmin = async () => {
  const data = await getSessionAdminData();

  return (
    <NavAdminWrapper>
      {data?.admin__nav__show.map(item => (
        <ItemNavAdmin
          key={item.code}
          id={item.code}
          items={item.nav.map(navItem => ({
            id: navItem.code,
            href: navItem.href,
            icon: navItem.icon ?? undefined,
            children: navItem.children?.map(child => ({
              id: child.code,
              href: child.href,
            })),
          }))}
        />
      ))}
    </NavAdminWrapper>
  );
};
