import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import {
  Controller,
  Get,
  Param,
  Query,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

import { ABSOLUTE_PATHS_BACKEND } from '../../..';

@Controller('secure_files')
export class DownloadSecureFilesController {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  @Get(':id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Param() { id }: { id: string },
    @Query() { security_key }: { security_key: string },
  ): Promise<null | StreamableFile> {
    const file = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, +id),
    });

    if (!file || file.security_key !== security_key) {
      res.status(404);

      return null;
    }

    const path = join(
      ABSOLUTE_PATHS_BACKEND.uploads.private,
      file.dir_folder,
      file.file_name,
    );

    const mediaType = file.mimetype.split('/')[0];

    const streamFile = createReadStream(path);
    res.set({
      'Content-Type': `application/${mediaType}`,
      'Content-Disposition': `attachment; filename="${file.file_name}"`,
    });

    return new StreamableFile(streamFile);
  }
}
