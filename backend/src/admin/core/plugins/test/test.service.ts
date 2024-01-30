// import { exec } from 'child_process';

import { Injectable } from '@nestjs/common';

import { DatabaseService } from '@/database/database.service';

@Injectable()
export class TestPluginsService {
  constructor(private databaseService: DatabaseService) {}

  async test(): Promise<string> {
    return `${__dirname} - Hello World!`;
  }

  async test2(): Promise<string> {
    // await this.testService.delete();

    // exec('pnpm db', (error, stdout, stderr) => {
    //   if (error) {
    //     console.log(`error: ${error.message}`);
    //     return;
    //   }
    //   if (stderr) {
    //     console.log(`stderr: ${stderr}`);
    //     return;
    //   }
    //   console.log(`stdout: ${stdout}`);
    // });

    return 'test';
  }
}
