import * as fs from 'fs';
import * as path from 'path';

import { Injectable } from '@nestjs/common';
import * as archiver from 'archiver';

// import * as files from '../../database/schema/files';

@Injectable()
export class TestPluginsService {
  constructor() {}

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
    // console.log(files, Object.keys(files));

    return 'test';
  }
}
