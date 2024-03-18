import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { Download, ExternalLink } from "lucide-react";

import type { Admin__Core_Plugins__Show__ItemQuery } from "@/graphql/hooks";
import { HeaderContent } from "@/components/header-content/header-content";
import { Badge } from "@/components/ui/badge";
import { Tabs } from "@/components/tabs/tabs";
import { TabsTrigger } from "@/components/tabs/tabs-trigger";
import { DateFormat } from "@/components/date-format/date-format";
import { Button } from "@/components/ui/button";

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
    <div>
      <HeaderContent
        h1={
          <div className="flex gap-2 items-center flex-wrap">
            <span>{name}</span>
            {isDefault && <Badge>{tCore("default")}</Badge>}
          </div>
        }
        desc={
          <div>
            {description && <p>{description}</p>}
            {version && version_code && (
              <span className="flex gap-1 flex-wrap">
                <span>{version}</span>
                <span className="text-muted-foreground">
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
        <Button>
          <Download /> {tCore("download")}
        </Button>
      </HeaderContent>

      <Tabs className="mb-5">
        <TabsTrigger
          id="overview"
          href={`/admin/core/plugins/${code}/dev/overview`}
        >
          {t("overview.title")}
        </TabsTrigger>
        <TabsTrigger id="files" href={`/admin/core/plugins/${code}/dev/files`}>
          {t("files.title")}
        </TabsTrigger>
        <TabsTrigger id="nav" href={`/admin/core/plugins/${code}/dev/nav`}>
          {t("nav.title")}
        </TabsTrigger>
      </Tabs>

      {children}
    </div>
  );
};
