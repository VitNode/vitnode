import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteCoreEditorArgs } from "./dto/delete.args";

import { DatabaseService } from "@/plugins/database/database.service";
import { DeleteCoreFilesService } from "../../files/helpers/delete/delete.service";
import { User } from "@/utils/decorators/user.decorator";
import { AccessDeniedError } from "@/utils/errors/AccessDeniedError";
import { core_files } from "../../admin/database/schema/files";

@Injectable()
export class DeleteCoreEditorService {
  constructor(
    private databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService
  ) {}

  async delete(
    { id: user_id }: User,
    { id, security_key }: DeleteCoreEditorArgs
  ): Promise<string> {
    const findFile = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (
      !findFile ||
      findFile.user_id !== user_id ||
      (findFile.security_key && findFile.security_key !== security_key)
    ) {
      throw new AccessDeniedError();
    }

    await this.databaseService.db
      .delete(core_files)
      .where(eq(core_files.id, id));

    this.deleteFile.delete({
      ...findFile,
      file_secure: !!findFile.security_key
    });

    return "Success!";
  }
}
