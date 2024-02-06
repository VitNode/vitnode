"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState
} from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useMemo, type ReactNode } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "../ui/button";
import type { PageInfo } from "@/graphql/hooks";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import { usePathname, useRouter } from "@/i18n";
import { ToolbarDataTable } from "./toolbar/toolbar";
import type { ToolbarDataTableProps } from "./toolbar/toolbar";

interface TDataMin {
  id: number;
}

interface DataTableProps<TData extends TDataMin> extends ToolbarDataTableProps {
  columns: ColumnDef<TData>[];
  data: TData[];
  defaultPageSize: 10 | 20 | 30 | 40 | 50;
  defaultSorting?: { sortBy: keyof TData; sortDirection: "desc" | "asc" };
  filters?: ReactNode;
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
    data: useMemo(() => data, [data]),
    columns: useMemo(() => columns, [columns]),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    getRowId: row => row.id.toString(),
    onSortingChange: data => {
      const fnSorting = data as () => SortingState;
      const sorting = fnSorting();

      const params = new URLSearchParams(searchParams);
      params.set("sortBy", sorting[0].id);
      params.set("sortDirection", sorting[0].desc ? "desc" : "asc");

      push(`${pathname}?${params.toString()}`);
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
  const pageSizeValue = useMemo(() => {
    if (enablePageSize.includes(Number(pagination.first))) {
      return Number(pagination.first);
    }

    if (enablePageSize.includes(Number(pagination.last))) {
      return Number(pagination.last);
    }

    return defaultPageSize;
  }, [pagination, defaultPageSize]);

  const changeState = ({
    cursor,
    nextPage,
    pageSize
  }: {
    cursor?: number | null;
    nextPage?: boolean;
    pageSize?: string | null;
  }) => {
    const params = new URLSearchParams(searchParams);

    if (cursor) {
      params.set("cursor", `${cursor}`);
    } else {
      params.delete("cursor");
    }

    const currentDefaultPageSize = {
      first: pagination.first ? pagination.first : `${defaultPageSize}`,
      last: pagination.last ? pagination.last : `${defaultPageSize}`
    };

    if (
      nextPage ||
      (pageSize && !nextPage) ||
      (!cursor && !nextPage && pageSize)
    ) {
      params.set("first", pageSize ? pageSize : currentDefaultPageSize.first);
      params.delete("last");
    } else {
      params.set("last", pageSize ? pageSize : currentDefaultPageSize.last);
      params.delete("first");
    }

    push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-4">
      <ToolbarDataTable {...props} />

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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
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
        <div className="flex items-center justify-end px-2 pt-4 gap-4 lg:gap-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Rows per page</p>
            <Select
              value={`${pageSizeValue}`}
              onValueChange={value => {
                changeState({ pageSize: value });
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSizeValue} />
              </SelectTrigger>
              <SelectContent side="top">
                {enablePageSize.map(pageSize => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              disabled={!pageInfo.hasPreviousPage}
              tooltip={t("pagination.previous")}
              onClick={() =>
                changeState({
                  cursor: pageInfo.startCursor,
                  pageSize: pagination.last
                })
              }
            >
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              tooltip={t("pagination.next")}
              disabled={!pageInfo.hasNextPage}
              onClick={() =>
                changeState({
                  cursor: pageInfo.endCursor,
                  pageSize: pagination.first,
                  nextPage: true
                })
              }
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
