import { useMemo } from "react";
import { useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";
import { ExternalLink } from "lucide-react";

import type {
  Admin__Core_Plugins__ShowQuery,
  ShowAdminPlugins
} from "@/graphql/hooks";
import { Badge } from "@/components/ui/badge";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { DateFormat } from "@/components/date-format";
import { DataTable } from "@/components/data-table/data-table";
import { Switch } from "@/components/ui/switch";
import { ActionsItemPluginsAdmin } from "./actions/actions";

export const ContentTablePluginsAdmin = ({
  admin__core_plugins__show: { edges, pageInfo }
}: Admin__Core_Plugins__ShowQuery) => {
  const t = useTranslations("core");

  const columns: ColumnDef<ShowAdminPlugins>[] = useMemo(
    () => [
      {
        header: t("table.name"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{data.name}</span>
              {data.default && <Badge>{t("default")}</Badge>}
            </div>
          );
        }
      },
      {
        header: t("table.version"),
        accessorKey: "version",
        cell: ({ row }) => {
          const data = row.original;

          if (!data.version_code) return null;

          return (
            <span className="flex gap-1">
              <span>{data.version}</span>
              <span className="text-muted-foreground">
                ({data.version_code})
              </span>
            </span>
          );
        }
      },
      {
        header: t("table.author"),
        accessorKey: "author",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <a
              href={data.author_url}
              className="flex gap-1"
              rel="noopener noreferrer"
              target="_blank"
            >
              {data.author} <ExternalLink className="size-4" />
            </a>
          );
        }
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {t("table.created")}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: "created",
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
        }
      },
      {
        header: t("table.enabled"),
        accessorKey: "enabled",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Switch
              disabled={data.default || data.protected}
              checked={data.enabled}
              onClick={async () => {
                // const mutation = await mutationApi({
                //   ...data,
                //   enabled: !data.enabled
                // });
                // if (mutation.error) {
                //   toast.error(tCore('errors.title'), {
                //     description: tCore('errors.internal_server_error')
                //   });
                //   return;
                // }
              }}
            />
          );
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsItemPluginsAdmin {...data} />;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={edges}
      pageInfo={pageInfo}
      defaultPageSize={10}
      columns={columns}
      // searchPlaceholder={t('search_placeholder')}
      defaultSorting={{
        sortBy: "created",
        sortDirection: "desc"
      }}
    />
  );
};
