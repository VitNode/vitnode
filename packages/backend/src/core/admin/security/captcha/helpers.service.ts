import { join } from 'path';

import { ABSOLUTE_PATHS_BACKEND } from '@/index';

export interface CaptchaSecurityConfig {
  secret_key: string;
}

export class HelpersAdminCaptchaSecurityService {
  protected readonly path: string = join(
    ABSOLUTE_PATHS_BACKEND.plugin({ code: 'core' }).root,
    'utils',
    'captcha.config.json',
  );
}
