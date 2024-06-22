import { join } from "path";
import * as fs from "fs";

import { convertColor, getHSLFromString } from "@vitnode/shared";
import { getConfigFile } from "../../config";

export interface HelpersForEmailReturnValues {
  url: string;
  protocol: string;
  hostname: string;
  port: string;
}

export const getHelpersForEmail = () => {
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

export const getTranslationForEmail = (plugin: string) => {
  const resolvePlugin = plugin.split(".");
  const path = join(
    process.cwd(),
    "..",
    "frontend",
    "plugins",
    resolvePlugin[0],
    "langs",
    "en.json"
  );

  const read = fs.readFileSync(path, "utf-8");
  const messages = JSON.parse(read);

  return (key: string) => {
    let message = messages;

    [...resolvePlugin, ...key.split(".")].forEach(part => {
      try {
        const next = message[part as any];

        if (part == null || next == null) {
          return key;
        }

        message = next;
      } catch (e) {
        return key;
      }
    });

    return message;
  };
};
