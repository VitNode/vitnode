import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { NotFoundError, DatabaseService } from "vitnode-backend";

import { DeleteAdminFilesArgs } from "./dto/delete.args";

import { core_files } from "../../database/schema/files";
import { DeleteCoreFilesService } from "@/plugins/core/files/helpers/delete/delete.service";

@Injectable()
export class DeleteAdminFilesService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly deleteFile: DeleteCoreFilesService
  ) {}

  async delete({ id }: DeleteAdminFilesArgs): Promise<string> {
    const findFile = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, id)
    });

    if (!findFile) {
      throw new NotFoundError("File");
    }

    this.deleteFile.delete({
      ...findFile,
      file_secure: !!findFile.security_key
    });

    await this.databaseService.db
      .delete(core_files)
      .where(eq(core_files.id, id));

    return "Success!";
  }
}
