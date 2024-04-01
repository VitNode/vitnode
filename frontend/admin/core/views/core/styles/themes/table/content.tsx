import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { ExternalLink } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { DateFormat } from "@/components/date-format/date-format";
import { Badge } from "@/components/ui/badge";
import type {
  Admin_Core_Themes__ShowQuery,
  ShowAdminThemes
} from "@/graphql/hooks";
import { ActionsItemThemesAdmin } from "./actions/actions";
import { CONFIG } from "@/config";

export const ContentTableThemesAdmin = ({
  admin__core_themes__show: { edges, pageInfo }
}: Admin_Core_Themes__ShowQuery) => {
  const t = useTranslations("core");

  const columns: ColumnDef<ShowAdminThemes>[] = useMemo(
    () => [
      {
        header: t("table.name"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex gap-2 items-center">
              <span className="font-semibold">{data.name}</span>
              {CONFIG.node_development && (
                <Badge variant="outline">ID: {data.id}</Badge>
              )}
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

          if (data.author_url) {
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

          return <span className="flex gap-1">{data.author}</span>;
        }
      },
      {
        header: (val) => {
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
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsItemThemesAdmin {...data} />;
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
