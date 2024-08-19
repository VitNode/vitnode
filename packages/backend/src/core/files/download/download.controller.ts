import { createReadStream } from 'fs';
import { join } from 'path';

import {
  Controller,
  Get,
  Param,
  Res,
  StreamableFile,
  Query,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { ABSOLUTE_PATHS_BACKEND } from '../../..';

// @SkipThrottle()
@Controller('secure_files')
export class DownloadSecureFilesController {
  constructor(private readonly databaseService: InternalDatabaseService) {}

  @Get(':id')
  async getFile(
    @Res({ passthrough: true }) res: FastifyReply,
    @Param() { id }: { id: string },
    @Query() { security_key }: { security_key: string },
  ): Promise<StreamableFile | void> {
    const file = await this.databaseService.db.query.core_files.findFirst({
      where: (table, { eq }) => eq(table.id, +id),
    });

    if (!file || file.security_key !== security_key) {
      res.status(404);

      return;
    }

    const path = join(
      ABSOLUTE_PATHS_BACKEND.uploads.private,
      file.dir_folder,
      file.file_name,
    );

    const mediaType = file.mimetype.split('/')[0];

    const streamFile = createReadStream(path);
    res.header('Content-Type', `application/${mediaType}`);
    res.header(
      'Content-Disposition',
      `attachment; filename="${file.file_name}"`,
    );

    return new StreamableFile(streamFile);
  }
}
