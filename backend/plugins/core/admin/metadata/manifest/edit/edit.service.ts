import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";

import { EditAdminManifestMetadataObj } from "./dto/edit.args";
import { ShowAdminManifestMetadataObj } from "../show/dto/show.obj";
import { getManifest } from "../functions";

import { DatabaseService } from "@/plugins/database/database.service";
import { core_languages } from "../../../database/schema/languages";

@Injectable()
export class EditAdminManifestMetadataService {
  constructor(private databaseService: DatabaseService) {}

  protected updateManifest({
    data,
    lang_code
  }: {
    data: EditAdminManifestMetadataObj;
    lang_code: string;
  }): ShowAdminManifestMetadataObj {
    const manifest = getManifest({ lang_code });
    const newManifest: ShowAdminManifestMetadataObj = {
      ...manifest,
      ...data
    };

    fs.writeFileSync(
      join(process.cwd(), "public", lang_code, "manifest.webmanifest"),
      JSON.stringify(newManifest, null, 2)
    );

    return newManifest;
  }

  async edit(
    data: EditAdminManifestMetadataObj
  ): Promise<ShowAdminManifestMetadataObj> {
    const languages = await this.databaseService.db
      .select({
        code: core_languages.code
      })
      .from(core_languages);

    const manifests = languages.map(lang =>
      this.updateManifest({
        data,
        lang_code: lang.code
      })
    );

    return manifests.find(manifest => manifest.lang === "en");
  }
}
