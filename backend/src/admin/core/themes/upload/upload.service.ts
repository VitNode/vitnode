import { Injectable } from '@nestjs/common';

import { UploadAdminThemesArgs } from './dto/delete.args';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class UploadAdminThemesService {
  constructor(private databaseService: DatabaseService) {}

  async upload({ file }: UploadAdminThemesArgs): Promise<string> {
    const tgz = await file;

    return 'upload';
  }
}
