import { Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import * as fs from 'fs';
import * as nodemailer from 'nodemailer';
import React from 'react';
import { Resend } from 'resend';

import { CustomError } from '../../../errors';
import { EmailProvider, getConfigFile } from '../../../providers/config';
import {
  EmailCredentialsFile,
  HelpersAdminEmailSettingsService,
} from './helpers.service';

export interface SendMailServiceArgs {
  subject: string;
  template: React.ReactElement;
  text?: string;
  to: string;
}

@Injectable()
export class MailService extends HelpersAdminEmailSettingsService {
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

    const html = await Promise.resolve(render(template));
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
          secure: config.smtp_secure ?? false,
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

      // TODO: Handle errors
      void transporter.sendMail({
        to,
        subject,
        html,
      });
    }

    if (
      configSettings.settings.email.provider === EmailProvider.resend &&
      config.resend_key
    ) {
      const resend = new Resend(config.resend_key);

      // TODO: Handle errors
      await resend.emails.send({
        from: `${configSettings.settings.general.site_name} <delivered@resend.dev>`,
        to,
        subject,
        html,
      });
    }
  }
}
