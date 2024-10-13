import { core_files, core_files_using } from '@/database/schema/files';
import { SortDirectionEnum } from '@/utils';
import { getUser } from '@/utils/database/helpers/get-user';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { count, eq, ilike, or } from 'drizzle-orm';

import { ShowAdminFilesArgs, ShowAdminFilesObj } from './show.dto';

@Injectable()
export class ShowAdminFilesService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async show({
    cursor,
    first,
    last,
    search = '',
    sortBy,
  }: ShowAdminFilesArgs): Promise<ShowAdminFilesObj> {
    const where = or(
      ilike(core_files.file_name_original, `%${search}%`),
      ilike(core_files.file_name, `%${search}%`),
      ilike(core_files.file_alt, `%${search}%`),
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
        const [countFileUsing] = await this.databaseService.db
          .select({
            count: count(),
          })
          .from(core_files_using)
          .where(eq(core_files_using.file_id, edge.id));

        return {
          ...edge,
          user: edge.user_id
            ? await getUser({
                id: edge.user_id,
                db: this.databaseService.db,
              })
            : null,
          count_uses: countFileUsing.count,
        };
      }),
    );

    return { ...pagination, edges };
  }
}
