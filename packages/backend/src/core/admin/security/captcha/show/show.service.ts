import { Injectable } from '@nestjs/common';

import { ShowAdminCaptchaSecurityObj } from './dto/show.obj';

import { getConfigFile } from '@/providers/config';

@Injectable()
export class ShowAdminCaptchaSecurityService {
  show(): ShowAdminCaptchaSecurityObj {
    const config = getConfigFile();

    return {
      ...config.security.captcha,
      secret_key: '',
    };
  }
}
