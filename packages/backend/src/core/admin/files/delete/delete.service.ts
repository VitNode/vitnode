import { FilesService } from '@/core/files/helpers/upload/upload.service';
import { core_files } from '@/database/schema/files';
import { NotFoundError } from '@/errors';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteAdminFilesArgs } from './dto/delete.args';

@Injectable()
export class DeleteAdminFilesService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly files: FilesService,
  ) {}

  async delete({ id }: DeleteAdminFilesArgs): Promise<string> {
    const findFile = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, id),
    });

    if (!findFile) {
      throw new NotFoundError('File');
    }

    this.files.delete({
      ...findFile,
      secure: !!findFile.security_key,
    });

    await this.databaseService.db
      .delete(core_files)
      .where(eq(core_files.id, id));

    return 'Success!';
  }
}
