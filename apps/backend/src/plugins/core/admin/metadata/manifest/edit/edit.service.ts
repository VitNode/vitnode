import * as fs from "fs";
import { join } from "path";

import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "vitnode-backend";

import { EditAdminManifestMetadataObj } from "./dto/edit.args";
import { ShowAdminManifestMetadataObj } from "../show/dto/show.obj";
import { getManifest } from "../functions";

import { core_languages } from "../../../database/schema/languages";
import { ABSOLUTE_PATHS } from "@/config";

@Injectable()
export class EditAdminManifestMetadataService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly configService: ConfigService
  ) {}

  protected updateManifest({
    data,
    lang_code
  }: {
    data: EditAdminManifestMetadataObj;
    lang_code: string;
  }): ShowAdminManifestMetadataObj {
    const frontendUrl: string = this.configService.getOrThrow("frontend_url");
    const manifest = getManifest({ lang_code });
    const newManifest: ShowAdminManifestMetadataObj = {
      ...manifest,
      ...data,
      start_url: `${frontendUrl}/${lang_code}${data.start_url}`,
      id: `${frontendUrl}/${lang_code}${data.start_url}`
    };

    fs.writeFileSync(
      join(
        ABSOLUTE_PATHS.uploads.public,
        "assets",
        lang_code,
        "manifest.webmanifest"
      ),
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
