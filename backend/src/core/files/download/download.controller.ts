import { createReadStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

import { Controller, Get, Param, Req, Res, StreamableFile } from '@nestjs/common';
import { Request, Response } from 'express';

import { InternalAuthorizationCoreSessionsService } from '../../sessions/authorization/internal/internal_authorization.service';

@Controller('files')
export class DownloadFilesController {
  constructor(private service: InternalAuthorizationCoreSessionsService) {}

  @Get(':file')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Param() { file }: { file: string }
  ): Promise<StreamableFile> {
    const path = join(process.cwd(), 'temp', file);
    if (!existsSync(path)) {
      res.status(404);

      return;
    }
    const userId = file.split('.')[0].split('--')[1].split('-')[0];
    const currentFile = {
      name: file.split('--')[0],
      type: file.split('.')[1]
    };

    if (userId) {
      try {
        const data = await this.service.authorization({
          req,
          res
        });

        if (+userId !== data.id) {
          res.status(404);

          return;
        }
      } catch (e) {
        res.status(404);

        return;
      }
    }

    const streamFile = createReadStream(path);
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${currentFile.name}.${currentFile.type}"`
    });

    streamFile.on('close', () => {
      unlinkSync(path);
    });

    return new StreamableFile(streamFile);
  }
}
