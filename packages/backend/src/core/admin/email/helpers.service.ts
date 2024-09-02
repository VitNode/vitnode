import { ABSOLUTE_PATHS_BACKEND, getConfigFile } from '@/index';
import * as fs from 'fs';
import { join } from 'path';

import { ShowAdminEmailSettingsServiceObj } from './settings/show/show.dto';

export interface EmailCredentialsFile
  extends Pick<
    ShowAdminEmailSettingsServiceObj,
    'provider' | 'smtp_host' | 'smtp_port' | 'smtp_secure' | 'smtp_user'
  > {
  resend_key: string;
  smtp_password: string;
}

export class HelpersAdminEmailSettingsService {
  protected readonly path: string = join(
    ABSOLUTE_PATHS_BACKEND.plugin({ code: 'core' }).root,
    'utils',
    'email.config.json',
  );

  protected getEmailCredentials(): EmailCredentialsFile {
    const config = getConfigFile();
    const defaultEmailCredentials: EmailCredentialsFile = {
      smtp_host: null,
      smtp_port: null,
      smtp_secure: false,
      smtp_user: null,
      smtp_password: '',
      resend_key: '',
      provider: config.settings.email.provider,
    };

    const emailCredentials: EmailCredentialsFile = fs.existsSync(this.path)
      ? JSON.parse(fs.readFileSync(this.path, 'utf-8'))
      : defaultEmailCredentials;

    return {
      smtp_host:
        emailCredentials.smtp_host ?? defaultEmailCredentials.smtp_host,
      smtp_port:
        emailCredentials.smtp_port ?? defaultEmailCredentials.smtp_port,
      smtp_secure:
        emailCredentials.smtp_secure ?? defaultEmailCredentials.smtp_secure,
      smtp_user:
        emailCredentials.smtp_user ?? defaultEmailCredentials.smtp_user,
      smtp_password:
        emailCredentials.smtp_password || defaultEmailCredentials.smtp_password,
      resend_key:
        emailCredentials.resend_key || defaultEmailCredentials.resend_key,
      provider: defaultEmailCredentials.provider,
    };
  }
}
