import { getSessionAdminData } from "@/app/[locale]/(admin)/admin/(auth)/get-session-admin";
import { ItemNavAdmin } from "./item/item";

export const NavAdmin = async () => {
  const data = await getSessionAdminData();

  return (
    <>
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
            href: "settings/main",
            icon: "Settings"
          },
          {
            id: "plugins",
            href: "plugins",
            icon: "PlugIcon"
          },
          {
            id: "styles",
            href: "styles/themes",
            icon: "Paintbrush"
          },
          {
            id: "metadata",
            href: "metadata/manifest",
            icon: "Tag"
          },
          {
            id: "langs",
            href: "langs",
            icon: "Languages"
          },
          {
            id: "advanced",
            href: "advanced/files",
            icon: "Cog"
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
            icon: "UserCog"
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
    </>
  );
};
