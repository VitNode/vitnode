"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  SortingState
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { usePathname, useRouter } from "@vitnode/frontend/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { PageInfo } from "@/graphql/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { ToolbarDataTable, ToolbarDataTableProps } from "./toolbar/toolbar";
import { SkeletonDataTable } from "./skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";

interface TDataMin {
  id: number;
}

interface DataTableProps<TData extends TDataMin>
  extends Omit<ToolbarDataTableProps, "startTransition"> {
  columns: ColumnDef<TData>[];
  data: TData[];
  defaultPageSize: 10 | 20 | 30 | 40 | 50;
  defaultSorting?: { sortBy: keyof TData; sortDirection: "asc" | "desc" };
  filters?: React.ReactNode;
  pageInfo?: PageInfo;
  searchPlaceholder?: string;
}

export function DataTable<TData extends TDataMin>({
  columns,
  data,
  defaultPageSize,
  defaultSorting,
  pageInfo,
  ...props
}: DataTableProps<TData>) {
  const [isPending, startTransition] = React.useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();
  const t = useTranslations("core");
  const pagination = {
    first: searchParams.get("first"),
    last: searchParams.get("last"),
    cursor: searchParams.get("cursor")
  };

  const table = useReactTable({
    data: React.useMemo(() => data, [data]),
    columns: React.useMemo(() => columns, [columns]),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId: row => row.id.toString(),
    onSortingChange: data => {
      const fnSorting = data as () => SortingState;
      const sorting = fnSorting();

      const params = new URLSearchParams(searchParams);
      params.set("sortBy", sorting[0].id);
      params.set("sortDirection", sorting[0].desc ? "desc" : "asc");

      push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    state: {
      sorting: defaultSorting
        ? [
            {
              id: defaultSorting.sortBy.toString(),
              desc: defaultSorting.sortDirection === "desc"
            }
          ]
        : []
    }
  });

  const enablePageSize = [10, 20, 30, 40, 50];
  const pageSizeValue: number = React.useMemo(() => {
    if (enablePageSize.includes(Number(pagination.first))) {
      return Number(pagination.first);
    }

    if (enablePageSize.includes(Number(pagination.last))) {
      return Number(pagination.last);
    }

    return defaultPageSize;
  }, [pagination, defaultPageSize]);

  return (
    <div className="flex flex-col gap-4">
      <ToolbarDataTable startTransition={startTransition} {...props} />

      {isPending ? (
        <SkeletonDataTable />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map(headerGroup => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map(header => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {cell.column.id === "actions" ? (
                            <div className="flex items-center justify-end gap-1">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      {t("no_results")}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {pageInfo && (
            <div className="flex flex-wrap items-center justify-center gap-4 px-2 pt-4 sm:justify-end">
              <span className="text-muted-foreground text-sm">
                {t("table.total_count", { count: pageInfo.totalCount })}
              </span>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <TooltipProvider>
                  <Tooltip>
                    <Select
                      value={`${pageSizeValue}`}
                      onValueChange={value => {
                        const params = new URLSearchParams(
                          searchParams.toString()
                        );
                        if (params.has("last")) {
                          params.set("last", value);
                          params.delete("first");
                        } else {
                          params.set("first", value);
                          params.delete("last");
                        }
                        push(`${pathname}?${params.toString()}`, {
                          scroll: false
                        });
                      }}
                    >
                      <TooltipTrigger asChild>
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue placeholder={pageSizeValue} />
                        </SelectTrigger>
                      </TooltipTrigger>
                      <SelectContent side="top">
                        {enablePageSize.map(pageSize => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <TooltipContent>{t("table.rows_per_page")}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={!pageInfo.hasPreviousPage}
                    ariaLabel={t("pagination.previous")}
                    onClick={() => {
                      if (!pageInfo.startCursor) return;

                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("cursor", `${pageInfo.startCursor}`);
                      params.set("last", `${pageSizeValue}`);
                      params.delete("first");
                      push(`${pathname}?${params.toString()}`, {
                        scroll: false
                      });
                    }}
                  >
                    <ChevronLeftIcon className="size-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    ariaLabel={t("pagination.next")}
                    disabled={!pageInfo.hasNextPage}
                    onClick={() => {
                      if (!pageInfo.endCursor) return;

                      const params = new URLSearchParams(
                        searchParams.toString()
                      );
                      params.set("cursor", `${pageInfo.endCursor}`);
                      params.set("first", `${pageSizeValue}`);
                      params.delete("last");
                      push(`${pathname}?${params.toString()}`, {
                        scroll: false
                      });
                    }}
                  >
                    <ChevronRightIcon className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
