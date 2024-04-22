"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslations } from "next-intl";

import { DataTable } from "@/components/data-table/data-table";
import type {
  Core_Members__Files__ShowQuery,
  ShowCoreFiles
} from "@/graphql/hooks";
import { DateFormat } from "@/components/date-format/date-format";

export const ContentFilesSettings = ({
  core_files__show: { edges, pageInfo }
}: Core_Members__Files__ShowQuery) => {
  const t = useTranslations("core.settings.files");
  const tCore = useTranslations("core");
  const columns: ColumnDef<ShowCoreFiles>[] = useMemo(
    () => [
      {
        header: "id",
        accessorKey: "id"
      },
      {
        header: tCore("table.name"),
        accessorKey: "file_name"
      },
      {
        header: tCore("table.created"),
        accessorKey: "created",
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.created} />;
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
      defaultSorting={{
        sortBy: "created",
        sortDirection: "desc"
      }}
      searchPlaceholder={t("search")}
      columns={columns}
    />
  );
};
