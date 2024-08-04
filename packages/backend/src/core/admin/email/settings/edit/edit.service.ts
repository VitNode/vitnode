import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminEmailSettingsServiceObj } from '../show/dto/show.obj';
import { EditAdminEmailSettingsServiceArgs } from './dto/edit.args';

import {
  EmailCredentialsFile,
  HelpersAdminEmailSettingsService,
} from '../../helpers.service';
import {
  ConfigType,
  EmailProvider,
  configPath,
  getConfigFile,
} from '@/providers/config';
import { InternalServerError, NotFoundError } from '@/errors';

@Injectable()
export class EditAdminEmailSettingsService extends HelpersAdminEmailSettingsService {
  edit({
    smtp,
    color_primary,
    color_primary_foreground,
    provider,
    resend_key,
  }: EditAdminEmailSettingsServiceArgs): ShowAdminEmailSettingsServiceObj {
    const emailCredentials = this.getEmailCredentials();

    // Update settings
    const configSettings = getConfigFile();
    const newData: ConfigType = {
      ...configSettings,
      settings: {
        ...configSettings.settings,
        email: {
          provider,
          color_primary,
          color_primary_foreground,
        },
      },
    };
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
        resend_key: resend_key || emailCredentials.resend_key,
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
