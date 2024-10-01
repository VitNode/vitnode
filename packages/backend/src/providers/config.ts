import { UploadCoreFilesObj } from '@/core/files/helpers/upload/upload.dto';
import * as fs from 'fs';
import { join } from 'path';

export enum AllowTypeFilesEnum {
  all = 'all',
  images = 'images',
  images_videos = 'images_videos',
  none = 'none',
}

export enum CaptchaTypeEnum {
  cloudflare_turnstile = 'cloudflare_turnstile',
  none = 'none',
  recaptcha_v2_checkbox = 'recaptcha_v2_checkbox',
  recaptcha_v2_invisible = 'recaptcha_v2_invisible',
  recaptcha_v3 = 'recaptcha_v3',
}

export enum EmailProvider {
  none = 'none',
  resend = 'resend',
  smtp = 'smtp',
}

export enum AiProvider {
  google = 'google',
  none = 'none',
  openai = 'openai',
}

export interface ConfigType {
  ai: {
    model?: string;
    provider: AiProvider;
  };
  editor: {
    files: {
      allow_type: AllowTypeFilesEnum;
    };
    sticky: boolean;
  };
  langs: {
    code: string;
    default: boolean;
    enabled: boolean;
  }[];
  logos: {
    dark?: UploadCoreFilesObj;
    light?: UploadCoreFilesObj;
    mobile_dark?: UploadCoreFilesObj;
    mobile_light?: UploadCoreFilesObj;
    mobile_width: number;
    text: string;
    width: number;
  };
  restart_server: boolean;
  security: {
    captcha: {
      site_key: string;
      type: CaptchaTypeEnum;
    };
  };
  settings: {
    authorization: {
      force_login: boolean;
      lock_register: boolean;
      require_confirm_email: boolean;
    };
    email: {
      color_primary: string;
      color_primary_foreground: string;
      from: string;
      logo?: UploadCoreFilesObj;
      provider: EmailProvider;
    };
    main: {
      contact_email: string;
      site_name: string;
      site_short_name: string;
    };
  };
}

export const DEFAULT_CONFIG_DATA: ConfigType = {
  restart_server: false,
  logos: {
    text: 'VitNode',
    width: 10,
    mobile_width: 3,
  },
  security: {
    captcha: {
      type: CaptchaTypeEnum.none,
      site_key: '',
    },
  },
  editor: {
    sticky: true,
    files: {
      allow_type: AllowTypeFilesEnum.all,
    },
  },
  ai: {
    provider: AiProvider.none,
  },
  settings: {
    main: {
      site_name: 'VitNode',
      site_short_name: 'VitNode',
      contact_email: '',
    },
    email: {
      provider: EmailProvider.none,
      color_primary: 'hsl(220, 74%, 50%)',
      color_primary_foreground: 'hsl(210, 40%, 98%)',
      from: '',
    },
    authorization: {
      force_login: false,
      lock_register: false,
      require_confirm_email: true,
    },
  },
  langs: [
    {
      code: 'en',
      enabled: true,
      default: true,
    },
  ],
};

export const configPath = join(
  process.cwd(),
  'src',
  'plugins',
  'core',
  'utils',
  'config.json',
);

export const getConfigFile = () => {
  const file = fs.readFileSync(configPath, 'utf-8');

  return JSON.parse(file) as ConfigType;
};
