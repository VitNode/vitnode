import { User } from '@/decorators';
import { Injectable } from '@nestjs/common';

import { SendAdminEmailService } from '../../send/send.service';
import { TestAdminEmailSettingsServiceArgs } from './dto/test.args';

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test(
    {
      from,
      to,
      subject,
      message,
      preview_text,
    }: TestAdminEmailSettingsServiceArgs,
    user: User,
  ): Promise<string> {
    await this.send({
      from,
      to,
      subject,
      message,
      preview_text,
      user,
    });

    return 'Email sent!';
  }
}
