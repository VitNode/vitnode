import { getConfigFile } from '@/providers/config';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import {
  CaptchaSecurityConfig,
  HelpersAdminCaptchaSecurityService,
} from '../helpers.service';
import { ShowAdminCaptchaSecurityObj } from './show.dto';

@Injectable()
export class ShowAdminCaptchaSecurityService extends HelpersAdminCaptchaSecurityService {
  show(): ShowAdminCaptchaSecurityObj {
    const config = getConfigFile();

    if (!fs.existsSync(this.path)) {
      return {
        ...config.security.captcha,
        secret_key: '',
      };
    }

    const captchaSecurityConfig: CaptchaSecurityConfig = JSON.parse(
      fs.readFileSync(this.path, 'utf8'),
    );

    return {
      ...config.security.captcha,
      ...captchaSecurityConfig,
    };
  }
}
