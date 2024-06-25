"use client";

import { useTranslations } from "next-intl";
import { ColumnDef } from "@tanstack/react-table";
import * as React from "react";
import { InfinityIcon, ShieldAlert } from "lucide-react";
import { Badge } from "vitnode-frontend/components/ui/badge";

import { DataTable } from "@/components/data-table/data-table";
import { ShowAdminStaffModerators } from "@/graphql/hooks";
import { DateFormat } from "@/components/date-format/date-format";
import { HeaderSortingDataTable } from "@/components/data-table/header";
import { UserLink } from "@/components/user/link/user-link";
import { GroupFormat } from "@/components/groups/group-format";
import { ModeratorsStaffAdminViewProps } from "../moderators-view";
import { ActionsTableModeratorsStaffAdmin } from "./actions/actions";

export const TableModeratorsStaffAdmin = ({
  data,
}: ModeratorsStaffAdminViewProps) => {
  const t = useTranslations("admin.members.staff");

  const columns: ColumnDef<ShowAdminStaffModerators>[] = React.useMemo(
    () => [
      {
        header: t("table.moderator"),
        accessorKey: "name",
        cell: ({ row }) => {
          const data = row.original;

          if (data.user_or_group.__typename === "User") {
            return <UserLink user={data.user_or_group} />;
          }

          if (data.user_or_group.__typename === "StaffGroupUser") {
            return (
              <GroupFormat
                group={{
                  ...data.user_or_group,
                  name: data.user_or_group.group_name,
                }}
              />
            );
          }

          return null;
        },
      },
      {
        header: t("table.type"),
        accessorKey: "type",
        cell: ({ row }) => {
          const data = row.original;

          return (
            <Badge variant="outline">
              {t(data.user_or_group.__typename === "User" ? "user" : "group")}
            </Badge>
          );
        },
      },
      {
        header: val => {
          return (
            <HeaderSortingDataTable {...val}>
              {t("table.updated")}
            </HeaderSortingDataTable>
          );
        },
        accessorKey: "updated",
        cell: ({ row }) => {
          const data = row.original;

          return <DateFormat date={data.updated} />;
        },
      },
      {
        header: t("table.permissions"),
        id: "permissions",
        cell: ({ row }) => {
          const data = row.original;
          const unrestricted = data.unrestricted;

          return (
            <Badge
              className="[&>svg]:size-4"
              variant={unrestricted ? "default" : "secondary"}
            >
              {unrestricted ? <InfinityIcon /> : <ShieldAlert />}
              {t(unrestricted ? "unrestricted" : "restricted")}
            </Badge>
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const data = row.original;

          if (data.protected) return null;

          return <ActionsTableModeratorsStaffAdmin data={data} />;
        },
      },
    ],
    [],
  );

  return (
    <DataTable
      data={data?.admin__core_staff_moderators__show.edges ?? []}
      pageInfo={data?.admin__core_staff_moderators__show.pageInfo}
      defaultPageSize={10}
      columns={columns}
      defaultSorting={{
        sortBy: "updated",
        sortDirection: "desc",
      }}
    />
  );
};
