import { AiProvider, configPath, ConfigType, getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';
import { unlink, writeFile } from 'fs/promises';

import { AiCredentialsFile, HelpersCoreAi } from '../../../ai/ai.helpers';
import { ShowAdminCoreAiObj } from '../show/show.dto';
import { EditAdminCoreAiArgs } from './edit.dto';

@Injectable()
export class EditAdminCoreAiService extends HelpersCoreAi {
  async edit({
    provider,
    key,
    model,
  }: EditAdminCoreAiArgs): Promise<ShowAdminCoreAiObj> {
    const configSettings = getConfigFile();

    // Update settings
    const newData: ConfigType = {
      ...configSettings,
      ai: {
        ...configSettings.ai,
        provider,
        model,
      },
    };
    await writeFile(configPath, JSON.stringify(newData, null, 2));

    if (provider === AiProvider.none) {
      // Remove .ai.config.json file if provider is none
      await unlink(this.path);

      return this.getAiCredentials();
    }

    // Update credentials
    if (key) {
      const newCredentials: AiCredentialsFile = {
        key,
      };

      await writeFile(this.path, JSON.stringify(newCredentials, null, 2));
    }

    return this.getAiCredentials();
  }
}
