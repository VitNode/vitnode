import { core_logs_email } from '@/database/schema/logs';
import { InternalDatabaseService, SortDirectionEnum } from '@/utils';
import { Injectable } from '@nestjs/common';

import { LogsAdminEmailArgs, LogsAdminEmailObj } from './logs.dto';

@Injectable()
export class LogsAdminEmailService {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  async logs({
    cursor,
    first,
    last,
  }: LogsAdminEmailArgs): Promise<LogsAdminEmailObj> {
    return await this.databaseService.paginationCursor({
      cursor,
      database: core_logs_email,
      first,
      last,
      primaryCursor: 'id',
      defaultSortBy: {
        column: 'created',
        direction: SortDirectionEnum.desc,
      },
      query: async args =>
        await this.databaseService.db.query.core_logs_email.findMany(args),
    });
  }
}
