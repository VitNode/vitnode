import { core_logs_email } from '@/database/schema/logs';
import { inputPaginationCursor, outputPagination } from '@/functions';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';
import { count } from 'drizzle-orm';

import { LogsAdminEmailArgs, LogsAdminEmailObj } from './logs.dto';

@Injectable()
export class LogsAdminEmailService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async logs({
    cursor,
    first,
    last,
  }: LogsAdminEmailArgs): Promise<LogsAdminEmailObj> {
    const pagination = await inputPaginationCursor({
      cursor,
      database: core_logs_email,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: {
        column: 'id',
        schema: core_logs_email.id,
      },
      defaultSortBy: {
        column: 'created',
        direction: SortDirectionEnum.desc,
      },
    });

    const edges = await this.databaseService.db.query.core_logs_email.findMany({
      ...pagination,
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_logs_email);

    return outputPagination({ edges, totalCount, first, cursor, last });
  }
}
