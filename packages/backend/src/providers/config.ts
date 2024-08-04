import * as fs from 'fs';
import { join } from 'path';

import { UploadCoreFilesObj } from '@/core/files/helpers/upload/dto/upload.obj';

export enum AllowTypeFilesEnum {
  all = 'all',
  images_videos = 'images_videos',
  images = 'images',
  none = 'none',
}

export enum CaptchaTypeEnum {
  none = 'none',
  recaptcha_v2_invisible = 'recaptcha_v2_invisible',
  recaptcha_v2_checkbox = 'recaptcha_v2_checkbox',
  recaptcha_v3 = 'recaptcha_v3',
  cloudflare_turnstile = 'cloudflare_turnstile',
}

export enum EmailProvider {
  none = 'none',
  smtp = 'smtp',
  resend = 'resend',
}

export interface ConfigType {
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
    mobile_width: number;
    text: string;
    width: number;
    dark?: UploadCoreFilesObj;
    light?: UploadCoreFilesObj;
    mobile_dark?: UploadCoreFilesObj;
    mobile_light?: UploadCoreFilesObj;
  };
  rebuild_required: {
    langs: boolean;
    plugins: boolean;
  };
  security: {
    captcha: {
      site_key: string;
      type: CaptchaTypeEnum;
    };
  };
  settings: {
    email: {
      color_primary: string;
      color_primary_foreground: string;
      provider: EmailProvider;
      logo?: UploadCoreFilesObj;
    };
    general: {
      site_name: string;
      site_short_name: string;
    };
  };
}

export const DEFAULT_CONFIG_DATA: ConfigType = {
  logos: {
    text: 'VitNode Website',
    width: 10,
    mobile_width: 3,
  },
  security: {
    captcha: {
      type: CaptchaTypeEnum.none,
      site_key: '',
    },
  },
  rebuild_required: {
    langs: false,
    plugins: false,
  },
  editor: {
    sticky: true,
    files: {
      allow_type: AllowTypeFilesEnum.all,
    },
  },
  settings: {
    general: {
      site_name: 'VitNode Community',
      site_short_name: 'VitNode',
    },
    email: {
      provider: EmailProvider.none,
      color_primary: 'hsl(220, 74%, 50%)',
      color_primary_foreground: 'hsl(210, 40%, 98%)',
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
