import { Injectable } from "@nestjs/common";
import { getConfigFile } from "../config";
import { convertColor, getHSLFromString } from "@vitnode/shared";
import { EmailHelpersServiceType } from "./email-helpers.type";
import EmailTemplate from "./template/email-template";

@Injectable()
export class EmailHelpersService {
  getHelpersForEmail: EmailHelpersServiceType["getHelpersForEmail"] = () => {
    const config = getConfigFile();
    // TODO: Implement parseFrontendUrlFromEnv
    // const frontend_url = parseFrontendUrlFromEnv();

    const primaryHSL = getHSLFromString(config.settings.email.color_primary);
    const primaryForegroundHSL = getHSLFromString(
      config.settings.email.color_primary_foreground
    );

    return {
      site_name: config.settings.general.site_name,
      site_short_name: config.settings.general.site_short_name,
      frontend_url: {
        url: "http://localhost:3000"
      },
      color: {
        primary: {
          DEFAULT: `[${primaryHSL ? convertColor.hslToHex(primaryHSL) : "#215fdc"}]`,
          foreground: `[${
            primaryForegroundHSL
              ? convertColor.hslToHex(primaryForegroundHSL)
              : "#131415"
          }]`
        },
        background: "[#f8f9fc]",
        foreground: "[#131415]",
        card: "[#fff]",
        border: "[#e0e4eb]",
        muted: {
          DEFAULT: "[#f1f3f9]",
          foreground: "[#676d79]"
        }
      }
    };
  };

  template: EmailHelpersServiceType["template"] = props => {
    return EmailTemplate({ ...props, helpers: this.getHelpersForEmail() });
  };
}
