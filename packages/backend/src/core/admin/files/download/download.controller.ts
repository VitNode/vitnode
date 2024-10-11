import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import {
  Controller,
  Get,
  Param,
  Req,
  Res,
  StreamableFile,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { createReadStream, existsSync, unlinkSync } from 'fs';
import { join } from 'path';

import { ABSOLUTE_PATHS_BACKEND } from '../../../..';
import { InternalAuthorizationCoreSessionsService } from '../../../sessions/authorization/internal/internal_authorization.service';
import { AuthorizationAdminSessionsService } from '../../sessions/authorization/authorization.service';

@Controller('files')
export class DownloadFilesAdminController {
  constructor(
    private readonly service: InternalAuthorizationCoreSessionsService,
    private readonly serviceAdmin: AuthorizationAdminSessionsService,
    private readonly databaseService: InternalDatabaseService,
  ) {}

  @Get(':file')
  async getFile(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request,
    @Param() { file }: { file: string },
  ): Promise<null | StreamableFile> {
    const path = join(ABSOLUTE_PATHS_BACKEND.uploads.temp, file);
    if (!existsSync(path)) {
      res.status(404);

      return null;
    }
    const userId = file.split('.')[0].split('--')[1].split('-')[0];
    const currentFile = {
      name: file.split('--')[0],
      type: file.split('.')[1],
    };

    const user = await this.databaseService.db.query.core_users.findFirst({
      where: (table, { eq }) => eq(table.id, +userId),
    });

    if (!user) {
      res.status(404);

      return null;
    }

    const isAdmin =
      await this.databaseService.db.query.core_admin_permissions.findFirst({
        where: (table, { eq, or }) =>
          or(eq(table.user_id, +userId), eq(table.group_id, user.group_id)),
      });

    if (isAdmin) {
      try {
        const data = await this.serviceAdmin.initialAuthorization({
          req,
          res,
        });

        if (+userId !== data.id) {
          res.status(404);

          return null;
        }
      } catch (_) {
        res.status(404);

        return null;
      }
    } else {
      try {
        const data = await this.service.authorization({
          req,
          res,
        });

        if (+userId !== data.id) {
          res.status(404);

          return null;
        }
      } catch (_) {
        res.status(404);

        return null;
      }
    }

    const streamFile = createReadStream(path);
    res.set({
      'Content-Type': `application/${currentFile.type}`,
      'Content-Disposition': `attachment; filename="${currentFile.name}.${currentFile.type}"`,
    });

    streamFile.on('close', () => {
      unlinkSync(path);
    });

    return new StreamableFile(streamFile);
  }
}
