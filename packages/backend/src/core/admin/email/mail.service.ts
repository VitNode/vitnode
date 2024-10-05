import { core_logs_email } from '@/database/schema/logs';
import { InternalDatabaseService } from '@/utils';
import { Inject, Injectable } from '@nestjs/common';
import { render } from '@react-email/render';
import React from 'react';

import { getConfigFile } from '../../../providers/config';
import { EmailSenderFunction } from './email.module';

export interface SendMailServiceArgs {
  subject: string;
  template: React.ReactElement;
  text?: string;
  to: string;
}

@Injectable()
export class MailService {
  constructor(
    private readonly databaseService: InternalDatabaseService,
    @Inject('VITNODE_EMAIL_SENDER')
    private readonly emailSender: EmailSenderFunction,
  ) {}

  private async handleErrors({
    to,
    html,
    error,
    subject,
  }: {
    error: string;
    html: string;
    subject: string;
    to: string;
  }) {
    await this.databaseService.db.insert(core_logs_email).values({
      to,
      subject,
      error,
      html,
    });
  }

  async sendMail({
    to,
    subject,
    template,
  }: SendMailServiceArgs): Promise<void> {
    const html = await Promise.resolve(render(template));
    const { settings } = getConfigFile();

    try {
      await this.emailSender({
        to,
        subject,
        html,
        from: settings.email.from,
        site_short_name: settings.main.site_short_name,
      });
    } catch (e) {
      const error = e as Error;
      await this.handleErrors({
        error: error.message,
        html,
        subject,
        to,
      });
    }
  }
}
