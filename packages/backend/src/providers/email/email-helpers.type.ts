import { EmailTemplateProps } from "./template/email-template";

export interface GetHelpersForEmailType {
  site_name: string;
  site_short_name: string;
  frontend_url: {
    url: string;
  };
  color: {
    primary: {
      DEFAULT: string;
      foreground: string;
    };
    background: string;
    foreground: string;
    card: string;
    border: string;
    muted: {
      DEFAULT: string;
      foreground: string;
    };
  };
}

export interface EmailHelpersServiceType {
  getHelpersForEmail: () => GetHelpersForEmailType;
  template: (props: Omit<EmailTemplateProps, "helpers">) => JSX.Element;
}
