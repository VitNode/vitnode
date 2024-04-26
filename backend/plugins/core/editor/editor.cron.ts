import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { eq } from "drizzle-orm";

import { core_files } from "../admin/database/schema/files";
import { DeleteCoreFilesService } from "../files/helpers/delete/delete.service";

import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class CoreEditorCron {
  constructor(
    private databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async clearTempFiles() {
    const tempFiles = await this.databaseService.db.query.core_files.findMany({
      where: (table, { and, eq, lt }) =>
        and(
          eq(table.temp, true),
          lt(table.created, new Date(Date.now() - 1000 * 60 * 60 * 24)) // 24 hours
        ),
      orderBy: (table, { desc }) => desc(table.created)
    });

    await Promise.all(
      tempFiles.map(async file => {
        await this.databaseService.db
          .delete(core_files)
          .where(eq(core_files.id, file.id));

        this.deleteFile.delete({
          ...file,
          file_secure: !!file.security_key
        });
      })
    );
  }
}
