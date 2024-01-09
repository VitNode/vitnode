import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import { count } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { core_members } from '@/src/admin/core/database/schema/groups';
import { outputPagination, inputPaginationCursor } from '@/functions/database/pagination';

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
    const cursor = null;
    const first = 5;
    const last = null;

    const pagination = await inputPaginationCursor({
      cursor,
      database: core_members,
      databaseService: this.databaseService,
      first,
      last,
      primaryCursor: { order: 'ASC', key: 'id', schema: core_members.id },
      cursors: [{ order: 'DESC', key: 'joined', schema: core_members.joined }]
    });

    const edges = await this.databaseService.db.query.core_members.findMany({
      orderBy: pagination.orderBy,
      where: pagination.where,
      limit: pagination.limit
    });

    const totalCount = await this.databaseService.db
      .select({ count: count() })
      .from(core_members)
      .where(pagination.where);

    const returnEdges = outputPagination({
      cursor,
      edges,
      first,
      last,
      totalCount
    });

    // eslint-disable-next-line no-console
    console.log(returnEdges);

    return 'test';
  }
}
