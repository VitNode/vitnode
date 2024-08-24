import { UploadCoreFilesObj } from '@/core/files/helpers/upload/dto/upload.obj';

import { EmailTemplateProps } from './template/email-template';

export interface GetHelpersForEmailType {
  backend_url: string;
  color: {
    background: string;
    border: string;
    card: string;
    foreground: string;
    muted: {
      DEFAULT: string;
      foreground: string;
    };
    primary: {
      DEFAULT: string;
      foreground: string;
    };
  };
  frontend_url: string;
  logo?: UploadCoreFilesObj;
  site_name: string;
  site_short_name: string;
}

export interface EmailHelpersServiceType {
  getHelpersForEmail: () => GetHelpersForEmailType;
  template: (props: Omit<EmailTemplateProps, 'helpers'>) => JSX.Element;
}
