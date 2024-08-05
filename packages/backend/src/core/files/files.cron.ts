import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { desc, eq, lt, sql } from 'drizzle-orm';

import { FilesService } from './helpers/upload/upload.service';

import { core_files, core_files_using } from '../../database/schema/files';
import { DatabaseService } from '@/utils';

@Injectable()
export class CoreFilesCron {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly files: FilesService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async clearTempFiles() {
    const tempFiles = await this.databaseService.db
      .select()
      .from(core_files)
      .leftJoin(core_files_using, eq(core_files_using.file_id, core_files.id))
      .where(lt(core_files.created, new Date(Date.now() - 1000 * 60 * 60 * 24)))
      .groupBy(
        core_files.id,
        core_files_using.file_id,
        core_files_using.plugin,
        core_files_using.folder,
        core_files_using.id,
      )
      .orderBy(desc(core_files.created))
      .having(sql`count(${core_files_using.file_id}) = 0`);

    await Promise.all(
      tempFiles.map(async file => {
        await this.databaseService.db
          .delete(core_files)
          .where(eq(core_files.id, file.core_files.id));

        this.files.delete({
          ...file.core_files,
          secure: !!file.core_files.security_key,
        });
      }),
    );
  }
}
