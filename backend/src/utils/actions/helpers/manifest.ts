import { readdir } from "fs/promises";
import { join } from "path";
import * as fs from "fs";

import * as dotenv from "dotenv";

import { objectToArray, updateObject } from "./update-object";
import { ABSOLUTE_PATHS, getConfigFile } from "@/config";
import { parseFrontendUrlFromEnv } from "@/functions/envs";

dotenv.config({
  path: join(process.cwd(), "..", ".env")
});

interface ManifestType {
  background_color?: string;
  description?: string;
  display?: "browser" | "fullscreen" | "minimal-ui" | "standalone";
  display_override?: (
    | "browser"
    | "fullscreen"
    | "minimal-ui"
    | "standalone"
    | "window-controls-overlay"
  )[];
  icons?: {
    src: string;
    purpose?: "any" | "badge" | "maskable" | "monochrome";
    sizes?: string;
    type?: string;
  }[];
  id?: string;
  lang?: string;
  name?: string;
  orientation?:
    | "any"
    | "landscape-primary"
    | "landscape-secondary"
    | "landscape"
    | "natural"
    | "portrait-primary"
    | "portrait-secondary"
    | "portrait";
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
      purpose?: "any" | "badge" | "maskable" | "monochrome";
      sizes?: string;
      type?: string;
    }[];
    short_name?: string;
  }[];
  start_url?: string;
  theme_color?: string;
}

const generateDefaultManifest = ({
  lang_code,
  frontend_url,
  site_name,
  site_short_name
}: {
  lang_code: string;
  frontend_url: string;
  site_name: string;
  site_short_name: string;
}): ManifestType => ({
  id: `${frontend_url}/${lang_code}/`,
  name: site_name,
  short_name: site_short_name,
  lang: lang_code,
  description: "",
  display: "standalone",
  theme_color: "#2463eb",
  background_color: "#09090b",
  start_url: `${frontend_url}/${lang_code}/`,
  orientation: "any",
  icons: [
    {
      src: "/icons/favicon.ico",
      sizes: "any",
      type: "image/x-icon"
    }
  ]
});

export const generateManifest = async () => {
  const config = await getConfigFile();
  const languages = (
    await readdir(join(ABSOLUTE_PATHS.frontend.langs), { withFileTypes: true })
  )
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);
  const frontend_url = parseFrontendUrlFromEnv().url;

  languages.forEach(lang_code => {
    const defaultManifest: ManifestType = generateDefaultManifest({
      lang_code,
      frontend_url,
      site_name: config.settings.general.site_name,
      site_short_name: config.settings.general.site_short_name
    });
    const path = join(ABSOLUTE_PATHS.uploads.public, "assets", lang_code);
    const filePath = join(path, "manifest.webmanifest");

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf8");
      const manifest: ManifestType = JSON.parse(data);
      const start_url = `${frontend_url}/${lang_code}`;
      const updatedManifest = objectToArray(
        updateObject(
          {
            ...manifest,
            start_url: `${start_url}${manifest.start_url.replace(start_url, "")}`,
            id: `${start_url}${manifest.start_url.replace(start_url, "")}`
          },
          defaultManifest
        )
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
