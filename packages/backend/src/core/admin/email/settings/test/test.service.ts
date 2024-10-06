import { User } from '@/decorators';
import { Injectable } from '@nestjs/common';

import { EmailService } from '../../email.service';
import { TestAdminEmailSettingsServiceArgs } from './test.dto';

@Injectable()
export class TestAdminEmailSettingsService {
  constructor(private readonly mailService: EmailService) {}

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
