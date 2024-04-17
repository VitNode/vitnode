import { join } from "path";
import * as fs from "fs";

import { ShowAdminManifestMetadataObj } from "./show/dto/show.obj";

import { NotFoundError } from "@/utils/errors/not-found-error";

export const getManifest = ({
  lang_code
}: {
  lang_code: string;
}): ShowAdminManifestMetadataObj => {
  const path = join(
    process.cwd(),
    "..",
    "frontend",
    "public",
    "assets",
    lang_code,
    "manifest.webmanifest"
  );

  if (!fs.existsSync(path)) {
    throw new NotFoundError(`Manifest for language code: ${lang_code}`);
  }

  const file = fs.readFileSync(path, "utf8");
  const data: ShowAdminManifestMetadataObj = JSON.parse(file);

  return data;
};
