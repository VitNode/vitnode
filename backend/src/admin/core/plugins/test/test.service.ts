import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import { count, eq } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { core_groups } from '@/src/admin/core/database/schema/groups';
import { outputPagination, inputPagination } from '@/functions/database/pagination';
import { core_moderators_permissions } from '../../database/schema/moderators';
import { currentDate } from '@/functions/date';

@Injectable()
export class TestPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async test(): Promise<string> {
    const output = 'public/temp/output.zip';
    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    });
    const stream = fs.createWriteStream(output);

    new Promise<void>((resolve, reject) => {
      archive.on('error', err => reject(err)).pipe(stream);

      stream.on('close', () => resolve());
      stream.on('end', () => resolve());
      stream.on('error', err => reject(err));

      // Recursive function to get all files in a directory
      const getFiles = dirPath => {
        fs.readdirSync(dirPath).forEach(file => {
          const fullPath = path.join(dirPath, file);

          if (fs.statSync(fullPath).isDirectory()) {
            getFiles(fullPath);
          } else {
            archive.file(fullPath, { name: fullPath });
          }
        });
      };

      getFiles('public');
      archive.finalize();
    });

    return `${__dirname} - Hello World!`;
  }

  async test2(): Promise<string> {
    await this.databaseService.db.insert(core_moderators_permissions).values({
      group_id: 3,
      user_id: null,
      unrestricted: true,
      created: currentDate(),
      updated: currentDate(),
      protected: true
    });

    return 'test';
  }
}
