import { createReadStream } from 'fs';
import { join } from 'path';

import { Controller, Get, Req, Res, StreamableFile } from '@nestjs/common';
import { Request, Response } from 'express';

import { InternalAuthorizationCoreSessionsService } from '../../sessions/authorization/internal/internal_authorization.service';

@Controller('files')
export class DownloadFilesController {
  constructor(private service: InternalAuthorizationCoreSessionsService) {}

  @Get(':id')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request
  ): Promise<StreamableFile> {
    const data = await this.service.authorization({
      req,
      res
    });

    const file = createReadStream(
      join(process.cwd(), 'temp', 'Default-Theme-0-1-0-Alpha-1--1-npKCW-1706356233.zip')
    );
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': 'attachment; filename="Default-Theme-0-1-0-Alpha-1.zip"'
    });

    return new StreamableFile(file);
  }
}
