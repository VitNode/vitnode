import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';

import { Injectable } from '@nestjs/common';

import { removeModuleFromRootSchema } from './contents';

const code = 'commerce';

@Injectable()
export class DeleteAdminPluginsService {
  constructor() {}

  async delete(): Promise<string> {
    const pathModules = `src/modules.module.ts`;
    const moduleContent = readFileSync(pathModules, 'utf8');
    await writeFile(
      pathModules,
      removeModuleFromRootSchema({
        content: moduleContent,
        code
      })
    );

    const pathAdminModules = `src/admin/admin.module.ts`;
    const adminModuleContent = readFileSync(pathAdminModules, 'utf8');

    await writeFile(
      pathAdminModules,
      removeModuleFromRootSchema({
        content: adminModuleContent,
        code,
        admin: true
      })
    );

    return 'DeleteAdminPluginsService';
  }
}
