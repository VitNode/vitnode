import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';

import { SendAdminEmailService } from '../../send/send.service';
import { ShowAdminEmailSettingsServiceObj } from './show.dto';

@Injectable()
export class ShowAdminEmailSettingsService {
  constructor(private readonly mailService: SendAdminEmailService) {}

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
