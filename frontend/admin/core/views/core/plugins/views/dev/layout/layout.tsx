import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

import type { Admin__Core_Plugins__Show__ItemQuery } from "@/graphql/hooks";
import { HeaderContent } from "@/components/header-content/header-content";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { DateFormat } from "@/components/date-format/date-format";
import { ActionsDevPluginAdmin } from "./actions/actions";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface Props extends Admin__Core_Plugins__Show__ItemQuery {
  children: ReactNode;
}

export const DevPluginAdminLayout = ({
  admin__core_plugins__show: { edges },
  children
}: Props) => {
  const t = useTranslations("admin.core.plugins.dev");
  const tCore = useTranslations("core");

  const plugin = edges.at(0);
  if (!plugin) return null;
  const {
    author,
    author_url,
    code,
    default: isDefault,
    description,
    name,
    updated,
    version,
    version_code
  } = plugin;

  return (
    <Card>
      <CardHeader>
        <HeaderContent
          h1={
            <div className="flex gap-2 items-center flex-wrap">
              <span>{name}</span>
              {isDefault && <Badge>{tCore("default")}</Badge>}
            </div>
          }
          desc={
            <div>
              {description && (
                <p className="text-sm max-w-80 truncate">{description}</p>
              )}
              {version && version_code && (
                <span className="flex gap-1 flex-wrap">
                  <span>{version}</span>
                  <span>
                    ({version_code}), <DateFormat date={updated} />
                  </span>
                </span>
              )}
              {author_url ? (
                <a
                  href={author_url}
                  className="inline-flex gap-1"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {author} <ExternalLink className="size-4" />
                </a>
              ) : (
                <span className="flex gap-1">{author}</span>
              )}
            </div>
          }
        >
          <ActionsDevPluginAdmin {...plugin} />
        </HeaderContent>
      </CardHeader>

      <CardContent>
        <Tabs className="mb-5">
          <TabsTrigger
            id="overview"
            href={`/admin/core/plugins/${code}/dev/overview`}
          >
            {t("overview.title")}
          </TabsTrigger>
          <TabsTrigger
            id="files"
            href={`/admin/core/plugins/${code}/dev/files`}
          >
            {t("files.title")}
          </TabsTrigger>
          <TabsTrigger id="nav" href={`/admin/core/plugins/${code}/dev/nav`}>
            {t("nav.title")}
          </TabsTrigger>
        </Tabs>

        {children}
      </CardContent>
    </Card>
  );
};
