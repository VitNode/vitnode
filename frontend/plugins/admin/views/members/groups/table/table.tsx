"use client";

import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { Link } from "@vitnode/frontend/navigation";

import { DataTable } from "@/components/data-table/data-table";
import { ShowAdminGroups } from "@/graphql/hooks";
import { useTextLang } from "@/plugins/core/hooks/use-text-lang";
import { ActionsTableGroupsMembersAdmin } from "./actions/actions";
import { DateFormat } from "@/components/date-format/date-format";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { GroupsMembersAdminViewProps } from "../groups-members-admin-view";
import { Badge } from "@/components/ui/badge";

export const TableGroupsMembersAdmin = ({
  data
}: GroupsMembersAdminViewProps) => {
  const t = useTranslations("admin.members.groups");
  const tCore = useTranslations("core");
  const { convertText } = useTextLang();

  const columns: ColumnDef<ShowAdminGroups>[] = React.useMemo(
    () => [
      {
        header: tCore("table.name"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <div className="flex items-center gap-4">
              <span>{convertText(data.name)}</span>
              {data.default && <Badge>{t("default")}</Badge>}
              {data.root && <Badge>{t("root")}</Badge>}
            </div>
          );
        }
      },
      {
        header: t("table.users_count"),
        accessorKey: "users_count",
        cell: ({ row }) => {
          const data = row.original;

          return !data.guest ? (
            <Link href={`/admin/members/users?groups=${data.id}`}>
              {data.users_count}
            </Link>
          ) : null;
        }
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {tCore("table.updated")}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: "updated",
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.updated} />;
        }
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          return <ActionsTableGroupsMembersAdmin {...data} />;
        }
      }
    ],
    []
  );

  return (
    <DataTable
      data={data?.admin__core_groups__show.edges ?? []}
      pageInfo={data?.admin__core_groups__show.pageInfo}
      defaultPageSize={10}
      columns={columns}
      searchPlaceholder={t("search_placeholder")}
      defaultSorting={{
        sortBy: "updated",
        sortDirection: "desc"
      }}
    />
  );
};
