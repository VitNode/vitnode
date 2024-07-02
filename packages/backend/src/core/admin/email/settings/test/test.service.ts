import { Injectable } from '@nestjs/common';

import { TestAdminEmailSettingsServiceArgs } from './dto/test.args';

import { SendAdminEmailService } from '../../send/send.service';
import { User } from '../../../../../decorators';

@Injectable()
export class TestAdminEmailSettingsService extends SendAdminEmailService {
  async test(
    {
      from,
      to,
      subject,
      message,
      previewText,
    }: TestAdminEmailSettingsServiceArgs,
    user: User,
  ): Promise<string> {
    await this.send({
      from,
      to,
      subject,
      message,
      previewText,
      username: user.name,
    });

    return 'Email sent!';
  }
}
