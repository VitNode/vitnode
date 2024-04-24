import { Injectable } from "@nestjs/common";

import { UploadCoreEditorArgs } from "./dto/upload.args";
import { acceptMimeTypeImage, acceptMimeTypeVideo } from "../helpers";

import { DatabaseService } from "@/plugins/database/database.service";
import { User } from "@/utils/decorators/user.decorator";
import { UploadCoreFilesService } from "../../files/helpers/upload/upload.service";
import { HelpersUploadCoreFilesService } from "../../files/helpers/upload/helpers";
import { UploadCoreFilesArgs } from "../../files/helpers/upload/dto/upload.args";
import { core_files } from "../../admin/database/schema/files";
import { ShowCoreFiles } from "../../files/show/dto/show.obj";

@Injectable()
export class UploadCoreEditorService extends HelpersUploadCoreFilesService {
  constructor(
    private databaseService: DatabaseService,
    private readonly uploadFile: UploadCoreFilesService
  ) {
    super();
  }

  private async getFilesAfterUpload({
    file,
    folder,
    plugin
  }: UploadCoreEditorArgs) {
    const acceptMimeTypeToFrontend = [
      ...acceptMimeTypeImage,
      ...acceptMimeTypeVideo
    ];
    const allowUploadToFrontend = await this.checkAcceptMimeType({
      file,
      acceptMimeType: acceptMimeTypeToFrontend,
      disableThrowError: true
    });
    const args: Omit<UploadCoreFilesArgs, "secure" | "acceptMimeType"> = {
      files: [file],
      maxUploadSizeBytes: 10 * 1024 * 1024 * 1024, // 10 GB
      plugin,
      folder
    };

    if (allowUploadToFrontend) {
      const current = await this.uploadFile.upload({
        ...args,
        acceptMimeType: acceptMimeTypeToFrontend
      });

      return current[0];
    }

    const current = await this.uploadFile.upload({
      ...args,
      acceptMimeType: [],
      secure: true
    });

    return current[0];
  }

  async upload(
    { id: user_id }: User,
    { file, folder, plugin }: UploadCoreEditorArgs
  ): Promise<ShowCoreFiles> {
    const uploadFile = await this.getFilesAfterUpload({ file, plugin, folder });

    // Save to database
    const data = await this.databaseService.db
      .insert(core_files)
      .values({
        user_id,
        ...uploadFile
      })
      .returning();

    const returnData = data[0];

    return returnData;
  }
}
