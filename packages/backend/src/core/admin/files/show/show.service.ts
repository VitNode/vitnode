import { Injectable } from '@nestjs/common';
import { and, count, eq, ilike, or } from 'drizzle-orm';

import { ShowAdminFilesArgs } from './dto/show.args';
import { ShowAdminFilesObj } from './dto/show.obj';

import { DatabaseService } from '../../../../database';
import { inputPaginationCursor, outputPagination } from '../../../../functions';
import {
  core_files,
  core_files_using,
} from '../../../../templates/core/admin/database/schema/files';
import { SortDirectionEnum } from '../../../../utils';

@Injectable()
export class ShowAdminFilesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search = '',
    sortBy,
  }: ShowAdminFilesArgs): Promise<ShowAdminFilesObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_files,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_files.id,
      },
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'created',
      },
      sortBy,
    });

    const where = or(
      ilike(core_files.file_name_original, `%${search}%`),
      ilike(core_files.file_name, `%${search}%`),
      ilike(core_files.file_alt, `%${search}%`),
    );

    const initEdges = await this.databaseService.db.query.core_files.findMany({
      ...pagination,
      where: and(pagination.where, where),
      with: {
        user: {
          with: {
            avatar: true,
            group: {
              with: {
                name: true,
              },
            },
          },
        },
      },
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_files)
      .where(where);

    const edges = await Promise.all(
      initEdges.map(async edge => {
        const countFileUsing = await this.databaseService.db
          .select({
            count: count(),
          })
          .from(core_files_using)
          .where(eq(core_files_using.file_id, edge.id));

        return {
          ...edge,
          count_uses: countFileUsing[0].count,
        };
      }),
    );

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
