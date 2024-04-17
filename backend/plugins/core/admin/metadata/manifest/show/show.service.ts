import { join } from "path";
import * as fs from "fs";

import { Injectable } from "@nestjs/common";

import { ShowAdminManifestMetadataObj } from "./dto/show.obj";

import { DatabaseService } from "@/plugins/database/database.service";

@Injectable()
export class ShowAdminManifestMetadataService {
  constructor(private databaseService: DatabaseService) {}

  protected getManifest({
    lang_code
  }: {
    lang_code: string;
  }): ShowAdminManifestMetadataObj {
    const path = join(
      process.cwd(),
      "public",
      lang_code,
      "manifest.webmanifest"
    );

    const file = fs.readFileSync(path, "utf8");
    const data: ShowAdminManifestMetadataObj = JSON.parse(file);

    return data;
  }

  show(): ShowAdminManifestMetadataObj {
    const data = this.getManifest({ lang_code: "en" });

    return {
      display: data.display
    };
  }
}
