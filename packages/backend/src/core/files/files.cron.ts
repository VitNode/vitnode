import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { desc, eq, lt, sql } from "drizzle-orm";

import { DeleteCoreFilesService } from "./helpers/delete/delete.service";

import { DatabaseService } from "../../database";
import {
  core_files,
  core_files_using
} from "../../templates/core/admin/database/schema/files";

@Injectable()
export class CoreFilesCron {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService
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
        core_files_using.id
      )
      .orderBy(desc(core_files.created))
      .having(sql`count(${core_files_using.file_id}) = 0`);

    await Promise.all(
      tempFiles.map(async file => {
        await this.databaseService.db
          .delete(core_files)
          .where(eq(core_files.id, file.core_files.id));

        this.deleteFile.delete({
          ...file.core_files,
          file_secure: !!file.core_files.security_key
        });
      })
    );
  }
}
