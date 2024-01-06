import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';
import { count, eq } from 'drizzle-orm';

import { DatabaseService } from '@/database/database.service';
import { core_groups } from '@/src/core/database/schema/groups';
import { outputPagination, inputPagination } from '@/functions/database/pagination';

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
    // const test = await this.drizzle.db.select().from(tableCoreUsers);

    // console.log(test);

    // const lang = await this.drizzle.db
    //   .insert(tableCoreLanguages)
    //   .values({
    //     id: 'en',
    //     name: 'English',
    //     timezone: 'UTC',
    //     protected: false,
    //     default: false,
    //     enabled: true,
    //     created: 1
    //   })
    //   .returning();

    // const group = await this.drizzle.db
    //   .insert(tableCoreGroups)
    //   .values({
    //     created: 1,
    //     updated: 1
    //   })
    //   .returning();

    // await this.drizzle.db
    //   .insert(tableCoreGroupsNames)
    //   .values({
    //     group_id: group[0].id,
    //     language_id: 'en',
    //     value: 'test'
    //   })
    //   .returning();

    const cursor = 'ab8da3a8-cd3e-483a-9042-c5c32cf8de2';
    const first = 2;
    const last = null;

    const edges = await this.databaseService.db.query.core_groups.findMany({
      orderBy: (table, { asc }) => [asc(table.created)],
      ...inputPagination({ cursor, first, last, where: eq(core_groups.protected, false) })
    });
    const totalCount = await this.databaseService.db.select({ count: count() }).from(core_groups);

    // eslint-disable-next-line no-console
    console.log(outputPagination({ totalCount, edges, cursor, first, last }));

    return 'test';
  }
}
