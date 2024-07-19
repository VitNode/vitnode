import { ItemNavAdmin } from './item/item';
import { NavAdminWrapper } from './wrapper';
import { getSessionAdminData } from '@/graphql/get-session-admin';

export const NavAdmin = async () => {
  const data = await getSessionAdminData();

  return (
    <NavAdminWrapper>
      <ItemNavAdmin
        id="core"
        items={[
          {
            id: 'dashboard',
            href: 'dashboard',
            icon: 'layout-dashboard',
          },
          {
            id: 'settings',
            href: 'general',
            icon: 'settings',
            children: [
              {
                id: 'general',
                href: 'general',
              },
              {
                id: 'security',
                href: 'security',
              },
              {
                id: 'metadata',
                href: 'metadata',
              },
              {
                id: 'email',
                href: 'email',
              },
            ],
          },
          {
            id: 'plugins',
            href: 'plugins',
            icon: 'plug',
          },
          {
            id: 'styles',
            href: 'nav',
            icon: 'paintbrush',
            children: [
              {
                id: 'nav',
                href: 'nav',
              },
              {
                id: 'editor',
                href: 'editor',
              },
            ],
          },
          {
            id: 'langs',
            href: 'langs',
            icon: 'languages',
          },
          {
            id: 'advanced',
            href: 'advanced/files',
            icon: 'cog',
            children: [
              {
                id: 'files',
                href: 'files',
              },
            ],
          },
        ]}
      />
      <ItemNavAdmin
        id="members"
        items={[
          {
            id: 'users',
            href: 'users',
            icon: 'users',
          },
          {
            id: 'groups',
            href: 'groups',
            icon: 'group',
          },
          {
            id: 'staff',
            href: 'staff/moderators',
            icon: 'user-cog',
            children: [
              {
                id: 'moderators',
                href: 'moderators',
              },
              {
                id: 'administrators',
                href: 'administrators',
              },
            ],
          },
        ]}
      />

      {data?.admin__sessions__authorization.nav.map(item => (
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
