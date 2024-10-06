import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';

import { EmailService } from '../../email.service';
import { ShowAdminEmailSettingsServiceObj } from './show.dto';

@Injectable()
export class ShowAdminEmailSettingsService {
  constructor(private readonly mailService: EmailService) {}

  show(): ShowAdminEmailSettingsServiceObj {
    const {
      settings: { email: emailSettings },
    } = getConfigFile();

    return {
      ...emailSettings,
      is_enabled: this.mailService.checkIfEnable(),
    };
  }
}
