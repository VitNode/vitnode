import { ABSOLUTE_PATHS_BACKEND } from '@/index';
import { join } from 'path';

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
