import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { DeleteAdminFilesArgs } from "./dto/delete.args";

import { DatabaseService } from "../../../../database";
import { DeleteCoreFilesService } from "../../../files/helpers/delete/delete.service";
import { NotFoundError } from "../../../../errors";
import { core_files } from "../../../../templates/core/admin/database/schema/files";

@Injectable()
export class DeleteAdminFilesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService,
  ) {}

  async delete({ id }: DeleteAdminFilesArgs): Promise<string> {
    const findFile = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!findFile) {
      throw new NotFoundError("File");
    }

    this.deleteFile.delete({
      ...findFile,
      file_secure: !!findFile.security_key,
    });

    await this.databaseService.db
      .delete(core_files)
      .where(eq(core_files.id, id));

    return "Success!";
  }
}
