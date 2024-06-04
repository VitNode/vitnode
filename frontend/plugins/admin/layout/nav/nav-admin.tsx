import { getSessionAdminData } from "@/app/[locale]/(admin)/admin/(auth)/get-session-admin";
import { ItemNavAdmin } from "./item/item";
import { NavAdminWrapper } from "./wrapper";

export const NavAdmin = async () => {
  const data = await getSessionAdminData();

  return (
    <NavAdminWrapper>
      <ItemNavAdmin
        id="core"
        items={[
          {
            id: "dashboard",
            href: "dashboard",
            icon: "LayoutDashboard"
          },
          {
            id: "settings",
            href: "general",
            icon: "Settings",
            children: [
              {
                id: "general",
                href: "general"
              },
              {
                id: "metadata",
                href: "metadata"
              }
            ]
          },
          {
            id: "plugins",
            href: "plugins",
            icon: "PlugIcon"
          },
          {
            id: "styles",
            href: "themes",
            icon: "Paintbrush",
            children: [
              {
                id: "themes",
                href: "themes"
              },
              {
                id: "nav",
                href: "nav"
              },
              {
                id: "editor",
                href: "editor"
              }
            ]
          },
          {
            id: "langs",
            href: "langs",
            icon: "Languages"
          },
          {
            id: "advanced",
            href: "advanced/files",
            icon: "Cog",
            children: [
              {
                id: "files",
                href: "files"
              }
            ]
          }
        ]}
      />
      <ItemNavAdmin
        id="members"
        items={[
          {
            id: "list",
            href: "users",
            icon: "Users"
          },
          {
            id: "groups",
            href: "groups",
            icon: "Group"
          },
          {
            id: "staff",
            href: "staff/moderators",
            icon: "UserCog",
            children: [
              {
                id: "moderators",
                href: "moderators"
              },
              {
                id: "administrators",
                href: "administrators"
              }
            ]
          }
        ]}
      />

      {data?.admin__sessions__authorization.nav.map(item => (
        <ItemNavAdmin
          key={item.code}
          id={item.code}
          items={item.nav.map(navItem => ({
            id: navItem.code,
            href: navItem.href,
            icon: navItem.icon ?? undefined
          }))}
        />
      ))}
    </NavAdminWrapper>
  );
};
