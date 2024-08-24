import { configPath, getConfigFile } from '@/providers';
import { Injectable } from '@nestjs/common';
import * as fs from 'fs';

import {
  CaptchaSecurityConfig,
  HelpersAdminCaptchaSecurityService,
} from '../helpers.service';
import { ShowAdminCaptchaSecurityObj } from '../show/dto/show.obj';
import { EditAdminCaptchaSecurityArgs } from './dto/edit.args';

@Injectable()
export class EditAdminCaptchaSecurityService extends HelpersAdminCaptchaSecurityService {
  edit({
    secret_key,
    ...rest
  }: EditAdminCaptchaSecurityArgs): ShowAdminCaptchaSecurityObj {
    const config = getConfigFile();
    const captchaSecurityConfig: CaptchaSecurityConfig = {
      secret_key,
    };
    config.security.captcha = {
      ...rest,
    };

    // Write public config to file
    fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
    // Write default config to file
    fs.writeFileSync(this.path, JSON.stringify(captchaSecurityConfig, null, 2));

    return {
      ...config.security.captcha,
      ...captchaSecurityConfig,
    };
  }
}
