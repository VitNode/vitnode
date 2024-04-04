"use client";

import { useLocale, useTranslations } from "next-intl";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { toast } from "sonner";

import type { LangsCoreAdminViewProps } from "../langs-core-admin-view";
import type { ShowCoreLanguages } from "@/graphql/hooks";
import { Badge } from "@/components/ui/badge";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { DateFormat } from "@/components/date-format/date-format";
import { Switch } from "@/components/ui/switch";
import { editMutationApi } from "../create-edit/hooks/edit-mutation-api";
import { ActionsTableLangsCoreAdmin } from "./actions/actions";
import { DataTable } from "@/components/data-table/data-table";

export const TableLangsCoreAdmin = ({ data }: LangsCoreAdminViewProps) => {
  const t = useTranslations("admin.core.langs");
  const tCore = useTranslations("core");
  const locale = useLocale();

  const columns: ColumnDef<ShowCoreLanguages>[] = useMemo(
    () => [
      {
        header: tCore("table.name"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{data.name}</span>
              {data.default && <Badge>{tCore("default")}</Badge>}
            </div>
          );
        }
      },
      {
        header: t("table.key"),
        accessorKey: "code"
      },
      {
        header: t("table.locale"),
        accessorKey: "locale"
      },
      {
        header: t("table.time_24"),
        accessorKey: "time_24",
        cell: ({ row }) => {
          const data = row.original;

          return data.time_24 ? tCore("yes") : tCore("no");
        }
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore("table.created")}
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
        header: tCore("table.enabled"),
        accessorKey: "enabled",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Switch
              disabled={data.default || data.protected || data.code === locale}
              checked={data.enabled}
              onClick={async () => {
                const mutation = await editMutationApi({
                  ...data,
                  enabled: !data.enabled,
                  time24: data.time_24
                });
                if (mutation.error) {
                  toast.error(tCore("errors.title"), {
                    description: tCore("errors.internal_server_error")
                  });

                  return;
                }
              }}
            />
          );
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          return <ActionsTableLangsCoreAdmin {...row.original} />;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={data?.core_languages__show.edges ?? []}
      pageInfo={data?.core_languages__show.pageInfo}
      searchPlaceholder={t("search_placeholder")}
      defaultPageSize={10}
      defaultSorting={{
        sortBy: "created",
        sortDirection: "desc"
      }}
      columns={columns}
    />
  );
};
