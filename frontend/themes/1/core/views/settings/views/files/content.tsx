"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Clock, File } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import type {
  Core_Members__Files__ShowQuery,
  ShowCoreFiles
} from "@/graphql/hooks";
import { DateFormat } from "@/components/date-format/date-format";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { formatBytes } from "@/functions/format-bytes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";

export const ContentFilesSettings = ({
  core_files__show: { edges, pageInfo }
}: Core_Members__Files__ShowQuery) => {
  const t = useTranslations("core.settings.files");
  const tCore = useTranslations("core");
  const columns: ColumnDef<ShowCoreFiles>[] = useMemo(
    () => [
      {
        header: "",
        accessorKey: "id",
        cell: ({ row }) => {
          const data = row.original;
          const src =
            data && data.width && data.height
              ? `/${data.dir_folder}/${data.file_name}`
              : null;
          const alt = data?.file_alt ?? data?.file_name ?? "";

          return (
            <div className="rounded-lg flex items-center w-20 h-14 justify-center relative overflow-hidden flex-shrink-0">
              {data.width && data.height && src ? (
                <Image
                  src={src}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  alt={alt}
                  fill
                />
              ) : (
                <File className="size-8 text-muted-foreground" />
              )}
            </div>
          );
        }
      },
      {
        header: tCore("table.name"),
        accessorKey: "file_name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div>
              <span className="leading-tight">{data.file_name}</span>
              <div className="text-sm text-muted-foreground flex gap-2 flex-wrap items-center">
                {data.temp && (
                  <>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <Clock className="size-4 text-destructive" />
                        </TooltipTrigger>
                        <TooltipContent>{t("temp_file")}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <span>&middot;</span>
                  </>
                )}
                <span>{data.mimetype}</span>
                {data?.width && data?.height && (
                  <>
                    <span>&middot;</span>
                    <span>
                      {data.width}x{data.height}
                    </span>
                  </>
                )}
              </div>
            </div>
          );
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
        header: t("table.file_size"),
        accessorKey: "file_size",
        cell: ({ row }) => {
          const data = row.original;

          return formatBytes(data.file_size);
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
