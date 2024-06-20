import { Injectable } from "@nestjs/common";
import { count } from "drizzle-orm";
import {
  inputPaginationCursor,
  outputPagination,
  SortDirectionEnum,
  DatabaseService
} from "vitnode-backend";

import { ShowAdminStaffAdministratorsArgs } from "./dto/show.args";
import { ShowAdminStaffAdministratorsObj } from "./dto/show.obj";

import { core_admin_permissions } from "@/plugins/core/admin/database/schema/admins";

@Injectable()
export class ShowAdminStaffAdministratorsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    sortBy
  }: ShowAdminStaffAdministratorsArgs): Promise<ShowAdminStaffAdministratorsObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_admin_permissions,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: "id",
        schema: core_admin_permissions.id
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "updated"
      },
      sortBy
    });

    const edges =
      await this.databaseService.db.query.core_admin_permissions.findMany({
        ...pagination,
        with: {
          group: {
            with: {
              name: true
            }
          },
          user: {
            with: {
              avatar: true,
              group: {
                with: {
                  name: true
                }
              }
            }
          }
        }
      });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_admin_permissions);

    return outputPagination({
      edges: edges.map(edge => {
        if (edge.user) {
          return {
            ...edge,
            user_or_group: {
              ...edge.user
            }
          };
        }

        return {
          ...edge,
          user_or_group: {
            ...edge.group,
            group_name: edge.group.name
          }
        };
      }),
      totalCount,
      first,
      cursor,
      last
    });
  }
}
