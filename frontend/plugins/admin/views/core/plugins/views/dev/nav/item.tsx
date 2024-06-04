import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { ShowAdminNavPluginsObj } from "@/utils/graphql/hooks";
import { ActionsTableNavDevPluginAdmin } from "./item/actions/actions";
import { FlatTree } from "@/functions/flatten-tree";
import { useItemNavDevPluginAdmin } from "./item/hooks/use-item-nav-dev-plugin-admin";

export const ItemContentNavDevPluginAdmin = (
  data: FlatTree<ShowAdminNavPluginsObj>
) => {
  const { code: pluginCode } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${pluginCode}.admin.nav`);
  const tAdmin = useTranslations("admin.core.plugins.dev.nav");
  const tCore = useTranslations("core");
  const { parentId } = useItemNavDevPluginAdmin();
  const langKey = parentId ? `${parentId}_${data.code}` : data.code;

  return (
    <>
      <div className="flex flex-col flex-1">
        <span className="font-semibold">
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          {t(langKey)}
        </span>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich("lang_key", {
            key: () => (
              <span className="text-foreground">{`${pluginCode}.admin.nav.${langKey}`}</span>
            )
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          {tCore.rich("link_url_with_link", {
            link: () => (
              <span className="text-foreground">{`/admin/${pluginCode}/${parentId ? `${parentId}/` : ""}${data.code}`}</span>
            )
          })}
        </p>
      </div>

      <ActionsTableNavDevPluginAdmin {...data} />
    </>
  );
};
