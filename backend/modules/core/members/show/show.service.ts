import { Injectable } from "@nestjs/common";
import { and, count, eq, ilike, or } from "drizzle-orm";

import { ShowCoreMembersObj } from "./dto/show.obj";
import { ShowCoreMembersArgs } from "./dto/show.args";

import { DatabaseService } from "@/modules/database/database.service";
import {
  inputPaginationCursor,
  outputPagination
} from "@/functions/database/pagination";
import { core_users } from "@/modules/core/admin/database/schema/users";
import { SortDirectionEnum } from "@/types/database/sortDirection.type";

@Injectable()
export class ShowCoreMembersService {
  constructor(private databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    name_seo,
    search,
    sortBy
  }: ShowCoreMembersArgs): Promise<ShowCoreMembersObj> {
    // TODO: Add search
    // const where: Prisma.core_membersWhereInput = findByIds
    //   ? { id: { in: findByIds, mode: 'insensitive' } }
    //   : {
    //       OR: [
    //         {
    //           name: {
    //             contains: search ?? ''
    //           }
    //         }
    //       ]
    //     };

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_users,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: "ASC", key: "id", schema: core_users.id },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: "joined"
      },
      sortBy
    });

    const where = or(
      eq(core_users.name_seo, name_seo),
      or(
        ilike(core_users.name, `%${search}%`),
        ilike(core_users.email, `%${search}%`),
        Number(search) ? eq(core_users.id, Number(search)) : undefined
      )
    );

    const edges = await this.databaseService.db.query.core_users.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        avatar: true,
        group: {
          with: {
            name: true
          }
        }
      }
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_users)
      .where(where);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
