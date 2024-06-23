import { Injectable } from "@nestjs/common";
import { count, eq } from "drizzle-orm";

import { DeleteCoreEditorArgs } from "./dto/delete.args";

import { DeleteCoreFilesService } from "../../files/helpers/delete/delete.service";
import { DatabaseService } from "../../../database";
import { User } from "../../../decorators";
import { AccessDeniedError } from "../../../errors";
import {
  core_files,
  core_files_using,
} from "../../../templates/core/admin/database/schema/files";

@Injectable()
export class DeleteCoreEditorService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService,
  ) {}

  async delete(
    { id: user_id }: User,
    { id, security_key }: DeleteCoreEditorArgs,
  ): Promise<string> {
    const findFile = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (
      !findFile ||
      findFile.user_id !== user_id ||
      (findFile.security_key && findFile.security_key !== security_key)
    ) {
      throw new AccessDeniedError();
    }

    const uses = await this.databaseService.db
      .select({
        count: count(),
      })
      .from(core_files_using)
      .where(eq(core_files_using.file_id, id));

    if (uses[0].count > 0) {
      return "Skipped! File is being used.";
    }

    this.deleteFile.delete({
      ...findFile,
      file_secure: !!findFile.security_key,
    });

    await this.databaseService.db
      .delete(core_files_using)
      .where(eq(core_files_using.file_id, id));

    await this.databaseService.db
      .delete(core_files)
      .where(eq(core_files.id, id));

    return "Success!";
  }
}
