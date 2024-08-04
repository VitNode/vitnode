import * as fs from 'fs';

import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import * as nodemailer from 'nodemailer';
import React from 'react';

import {
  HelpersAdminEmailSettingsService,
  EmailCredentialsFile,
} from './helpers.service';

import { CustomError } from '../../../errors';
import { EmailProvider, getConfigFile } from '../../../providers/config';

export interface SendMailServiceArgs {
  subject: string;
  template: React.ReactElement;
  to: string;
  text?: string;
}

@Injectable()
export class MailService extends HelpersAdminEmailSettingsService {
  private readonly generateEmail = (template: React.ReactElement) => {
    return render(template);
  };

  async sendMail({
    to,
    subject,
    template,
  }: SendMailServiceArgs): Promise<void> {
    if (!fs.existsSync(this.path)) {
      throw new CustomError({
        code: 'EMAIL_NOT_CONFIGURED',
        message:
          'Email settings are not configured. Please configure them in the AdminCP.',
      });
    }

    const html = this.generateEmail(template);
    const data = fs.readFileSync(this.path, 'utf-8');
    const config: EmailCredentialsFile = JSON.parse(data);
    const configSettings = getConfigFile();

    if (
      configSettings.settings.email.provider === EmailProvider.smtp &&
      config.smtp_host &&
      config.smtp_user &&
      config.smtp_port
    ) {
      const transporter = nodemailer.createTransport(
        {
          host: config.smtp_host,
          port: config.smtp_port,
          secure: config.smtp_secure || false,
          auth: {
            user: config.smtp_user,
            pass: config.smtp_password,
          },
        },
        {
          from: {
            name: configSettings.settings.general.site_name,
            address: 'aXenDeveloper@gmail.com',
          },
        },
      );

      await transporter.sendMail({
        to,
        subject,
        html,
      });
    }
  }
}
