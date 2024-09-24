import { FilesService } from '@/core/files/helpers/upload/upload.service';
import { InternalServerError, NotFoundError } from '@/errors';
import {
  configPath,
  ConfigType,
  EmailProvider,
  getConfigFile,
} from '@/providers/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import {
  EmailCredentialsFile,
  HelpersAdminEmailSettingsService,
} from '../../helpers.service';
import { ShowAdminEmailSettingsServiceObj } from '../show/show.dto';
import { EditAdminEmailSettingsServiceArgs } from './edit.dto';

@Injectable()
export class EditAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  constructor(private readonly files: FilesService) {
    super();
  }

  async edit({
    smtp,
    color_primary,
    color_primary_foreground,
    provider,
    resend_key,
    logo,
    from,
  }: EditAdminEmailSettingsServiceArgs): Promise<ShowAdminEmailSettingsServiceObj> {
    const emailCredentials = this.getEmailCredentials();
    const configSettings = getConfigFile();
    // Update settings
    const newData: ConfigType = {
      ...configSettings,
      settings: {
        ...configSettings.settings,
        email: {
          ...configSettings.settings.email,
          provider,
          color_primary,
          color_primary_foreground,
          from,
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

    // Remove email.config.json if provider is none
    if (provider === EmailProvider.none && fs.existsSync(this.path)) {
      fs.unlinkSync(this.path);

      return {
        ...emailCredentials,
        color_primary,
      };
    }

    if (provider === EmailProvider.smtp) {
      if (!smtp?.host || !smtp.user || !smtp.port) {
        throw new NotFoundError('SMTP data');
      }

      const updateData: Partial<EmailCredentialsFile> = {
        smtp_host: smtp.host,
        smtp_user: smtp.user,
        smtp_password: smtp.password || emailCredentials.smtp_password,
        smtp_port: smtp.port,
        smtp_secure: smtp.secure,
      };

      fs.writeFileSync(this.path, JSON.stringify(updateData, null, 2));

      return {
        ...emailCredentials,
        ...updateData,
        color_primary,
      };
    }

    if (provider === EmailProvider.resend) {
      const updateData: Partial<EmailCredentialsFile> = {
        resend_key: resend_key ?? emailCredentials.resend_key,
      };

      fs.writeFileSync(this.path, JSON.stringify(updateData, null, 2));

      return {
        ...emailCredentials,
        ...updateData,
        color_primary,
      };
    }

    // Still here? Something went wrong
    throw new InternalServerError();
  }
}
