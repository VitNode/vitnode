import { User } from '@/decorators';
import { Injectable } from '@nestjs/common';

import { SendAdminEmailService } from '../../send/send.service';
import { TestAdminEmailSettingsServiceArgs } from './test.dto';

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test(
    { to, subject, message, preview_text }: TestAdminEmailSettingsServiceArgs,
    user: User,
  ): Promise<string> {
    await this.send({
      to,
      subject,
      message,
      preview_text,
      user,
    });

    return 'Email sent!';
  }
}
