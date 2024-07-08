import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import { ShowAdminCaptchaSecurityObj } from './dto/show.obj';
import {
  CaptchaSecurityConfig,
  HelpersAdminCaptchaSecurityService,
} from '../helpers.service';

import { getConfigFile } from '@/providers/config';

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
