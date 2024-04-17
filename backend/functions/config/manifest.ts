import { readdir } from "fs/promises";
import { join } from "path";
import * as fs from "fs";

import { objectToArray, updateObject } from "./update-object";

import { ConfigType } from "@/config/get-config-file";

interface ManifestType {
  background_color?: string;
  description?: string;
  display?: "fullscreen" | "standalone" | "minimal-ui" | "browser";
  display_override?: (
    | "fullscreen"
    | "standalone"
    | "minimal-ui"
    | "browser"
    | "window-controls-overlay"
  )[];
  icons?: {
    src: string;
    purpose?: "any" | "maskable" | "monochrome" | "badge";
    sizes?: string;
    type?: string;
  }[];
  id?: string;
  lang?: string;
  name?: string;
  orientation?:
    | "any"
    | "natural"
    | "landscape"
    | "portrait"
    | "portrait-primary"
    | "portrait-secondary"
    | "landscape-primary"
    | "landscape-secondary";
  screenshots?: {
    src: string;
    sizes?: string;
    type?: string;
  }[];
  short_name?: string;
  shortcuts?: {
    name: string;
    url: string;
    description?: string;
    icons?: {
      src: string;
      purpose?: "any" | "maskable" | "monochrome" | "badge";
      sizes?: string;
      type?: string;
    }[];
    short_name?: string;
  }[];
  start_url?: string;
  theme_color?: string;
}

export const generateManifest = async (config: ConfigType) => {
  const languages = (
    await readdir(join("..", "frontend", "langs"), { withFileTypes: true })
  )
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  languages.forEach(language => {
    const defaultManifest: ManifestType = {
      name: config.settings.general.site_name,
      short_name: config.settings.general.site_short_name,
      lang: language,
      description: "",
      display: "standalone",
      icons: [
        {
          src: "/public/icons/favicon.ico",
          sizes: "any",
          type: "image/x-icon"
        }
      ]
    };
    const path = join(process.cwd(), "public", language);
    const filePath = join(path, "manifest.webmanifest");

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const manifest: ManifestType = JSON.parse(data);

      const updatedManifest = objectToArray(
        updateObject(manifest, {
          ...defaultManifest
        })
      );

      fs.writeFile(
        filePath,
        JSON.stringify(updatedManifest, null, 2),
        "utf8",
        err => {
          if (err) throw err;
        }
      );

      return;
    }

    fs.mkdirSync(path, { recursive: true });

    fs.writeFile(
      filePath,
      JSON.stringify(defaultManifest, null, 2),
      "utf8",
      err => {
        if (err) throw err;
      }
    );
  });
};
