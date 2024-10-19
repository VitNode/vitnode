import { FilesService } from '@/core/files/helpers/upload/upload.service';
import { configPath, ConfigType, getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import { ShowAdminEmailSettingsServiceObj } from '../show/show.dto';
import { EditAdminEmailSettingsServiceArgs } from './edit.dto';

@Injectable()
export class EditAdminEmailSettingsService {
  constructor(private readonly files: FilesService) {}

  async edit({
    color_primary,
    color_primary_foreground,
    logo,
  }: EditAdminEmailSettingsServiceArgs): Promise<ShowAdminEmailSettingsServiceObj> {
    const configSettings = getConfigFile();
    // Update settings
    const newData: ConfigType = {
      ...configSettings,
      settings: {
        ...configSettings.settings,
        email: {
          ...configSettings.settings.email,
          color_primary,
          color_primary_foreground,
        },
      },
    };

    // Update logo
    if (logo?.file && !logo.keep) {
      if (configSettings.settings.email.logo) {
        this.files.delete(configSettings.settings.email.logo);
      }

      const newLogo = await this.files.upload({
        file: logo.file,
        maxUploadSizeBytes: 1024 * 1024 * 2, // 2MB
        acceptMimeType: ['image/png', 'image/jpeg', 'image/gif'],
        plugin: 'core',
        folder: 'email',
      });

      newData.settings.email.logo = newLogo;
    } else if (configSettings.settings.email.logo && !logo?.keep) {
      this.files.delete(configSettings.settings.email.logo);

      delete newData.settings.email.logo;
    }

    fs.writeFileSync(configPath, JSON.stringify(newData, null, 2), 'utf8');

    return {
      color_primary,
      is_enabled: true,
      logo: newData.settings.email.logo,
    };
  }
}
