import { User } from '@/decorators';
import { Injectable } from '@nestjs/common';

import { SendAdminEmailService } from '../../send/send.service';
import { TestAdminEmailSettingsServiceArgs } from './test.dto';

@Injectable()
export class TestAdminEmailSettingsService {
  constructor(private readonly mailService: SendAdminEmailService) {}

  async test(
    { to, subject, message, preview_text }: TestAdminEmailSettingsServiceArgs,
    user: User,
  ): Promise<string> {
    await this.mailService.send({
      to,
      subject,
      message,
      previewText: preview_text,
      user,
    });

    return 'Email sent!';
  }
}
