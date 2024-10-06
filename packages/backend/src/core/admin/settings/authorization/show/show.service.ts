import { EmailService } from '@/core/admin/email/email.service';
import { getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';

import { ShowAdminAuthorizationSettingsObj } from './show.dto';

@Injectable()
export class ShowAdminAuthorizationSettingsService {
  constructor(private readonly mailService: EmailService) {}

  show(): ShowAdminAuthorizationSettingsObj {
    const config = getConfigFile();
    const isEmailEnabled = this.mailService.checkIfEnable();

    return {
      ...config.settings.authorization,
      require_confirm_email:
        config.settings.authorization.require_confirm_email && isEmailEnabled,
    };
  }
}
