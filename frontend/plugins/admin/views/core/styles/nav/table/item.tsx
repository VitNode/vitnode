import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";

import { ShowCoreNav } from "@/utils/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { ActionsTableNavAdmin } from "./actions/actions";
import { FlatTree } from "@/plugins/core/hooks/drag&drop/use-functions";

interface Props {
  data: FlatTree<Omit<ShowCoreNav, "__typename">>;
}

export const ItemContentTableContentNavAdmin = ({ data }: Props) => {
  const t = useTranslations("admin.core.styles.nav");
  const { convertText } = useTextLang();

  return (
    <>
      <div className="flex flex-col flex-1">
        <div className="flex gap-2 items-center">
          <span className="font-semibold">{convertText(data.name)}</span>
        </div>

        <span className="text-muted-foreground text-sm line-clamp-2 flex gap-2 items-center">
          {t("href", { href: data.href })}{" "}
          {data.external && <ExternalLink className="size-4" />}
        </span>

        {data.description.length > 0 && (
          <span className="text-muted-foreground text-sm line-clamp-2">
            {convertText(data.description)}
          </span>
        )}
      </div>

      <ActionsTableNavAdmin {...data} />
    </>
  );
};
