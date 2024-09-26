import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '@/index';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

import { ShowAdminCoreAiObj } from './show/show.dto';

export class HelpersCoreAi {
  protected readonly path: string = join(
    ABSOLUTE_PATHS_BACKEND.plugin({ code: 'core' }).root,
    'utils',
    '.ai.config.json',
  );

  protected getAiCredentials() {
    const config = getConfigFile();
    const defaultAiCredentials: Pick<ShowAdminCoreAiObj, 'key'> = {
      key: '',
    };

    const aiCredentials: ShowAdminCoreAiObj = existsSync(this.path)
      ? JSON.parse(readFileSync(this.path, 'utf-8'))
      : defaultAiCredentials;

    return {
      ...config.ai,
      key: aiCredentials.key || defaultAiCredentials.key,
    };
  }
}
