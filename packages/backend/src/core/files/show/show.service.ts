import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { and, count, eq, ilike, or } from 'drizzle-orm';

import { core_files, core_files_using } from '../../../database/schema/files';
import { User } from '../../../decorators';
import { SortDirectionEnum } from '../../../utils';
import { ShowCoreFilesArgs, ShowCoreFilesObj } from './show.dto';

@Injectable()
export class ShowCoreFilesService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show(
    { id: user_id }: User,
    { cursor, first, last, search = '', sortBy }: ShowCoreFilesArgs,
  ): Promise<ShowCoreFilesObj> {
    const where = and(
      eq(core_files.user_id, user_id),
      or(
        ilike(core_files.file_name_original, `%${search}%`),
        ilike(core_files.file_name, `%${search}%`),
        ilike(core_files.file_alt, `%${search}%`),
      ),
    );

    const pagination = await this.databaseService.paginationCursor({
      cursor,
      database: core_files,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        direction: SortDirectionEnum.desc,
        column: 'created',
      },
      sortBy,
      where,
      query: async args =>
        await this.databaseService.db.query.core_files.findMany(args),
    });

    const edges = await Promise.all(
      pagination.edges.map(async edge => {
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

    return { ...pagination, edges };
  }
}
