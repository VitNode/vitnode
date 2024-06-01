import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

import { ShowAdminNavPluginsObj } from "@/utils/graphql/hooks";
import { FlatTree } from "@/plugins/core/hooks/drag&drop/use-functions";
import { ActionsTableNavDevPluginAdmin } from "./actions/actions";

interface Props {
  data: FlatTree<ShowAdminNavPluginsObj>;
}

export const ItemContentNavDevPluginAdmin = ({ data }: Props) => {
  const { code: pluginCode } = useParams();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const t = useTranslations(`${pluginCode}.admin.nav`);
  const tAdmin = useTranslations("admin.core.plugins.dev.nav");
  const tCore = useTranslations("core");

  return (
    <>
      <div className="flex flex-col flex-1">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <span className="font-semibold">{t(data.code)}</span>
        <p className="text-muted-foreground text-sm">
          {tAdmin.rich("key", {
            key: () => (
              <span className="text-foreground">{`${pluginCode}.admin.nav.${data.code}`}</span>
            )
          })}
        </p>
        <p className="text-muted-foreground text-sm">
          {tCore.rich("link_url_with_link", {
            link: () => (
              <span className="text-foreground">{`/admin/${pluginCode}/${data.code}`}</span>
            )
          })}
        </p>
      </div>

      <ActionsTableNavDevPluginAdmin {...data} />
    </>
  );
};
