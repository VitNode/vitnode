"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { Clock, Download, File } from "lucide-react";

import { CONFIG } from "@/config";
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
import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/i18n";

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
            data?.width && data.height
              ? `${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`
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
              <span className="truncate leading-tight max-w-80 block">
                {data.file_name_original}
              </span>
              <div className="text-sm text-muted-foreground flex gap-2 flex-wrap items-center">
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
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {t("table.file_size")}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: "file_size",
        cell: ({ row }) => {
          const data = row.original;

          return formatBytes(data.file_size);
        }
      },
      {
        header: t("table.count_uses"),
        accessorKey: "count_uses",
        cell: ({ row }) => {
          const data = row.original;

          if (data.count_uses === 0) {
            return (
              <div className="flex gap-2 items-center">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Clock className="size-4 text-destructive" />
                    </TooltipTrigger>
                    <TooltipContent>{t("temp_file")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                {data.count_uses}
              </div>
            );
          }

          return data.count_uses;
        }
      },
      {
        header: "",
        accessorKey: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost"
                    })}
                    href={
                      data.width && data.height
                        ? `${CONFIG.backend_public_url}/${data.dir_folder}/${data.file_name}`
                        : `${CONFIG.backend_url}/secure_files/${data.id}?security_key=${data.security_key}`
                    }
                    target="_blank"
                    aria-label={tCore("download")}
                  >
                    <Download />
                  </Link>
                </TooltipTrigger>

                <TooltipContent>{tCore("download")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );
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
