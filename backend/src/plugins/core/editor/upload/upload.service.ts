import { Injectable } from "@nestjs/common";
import { eq, sum } from "drizzle-orm";
import { generateRandomString } from "@vitnode/shared";
import { AccessDeniedError, User } from "@vitnode/backend";

import { UploadCoreEditorArgs } from "./dto/upload.args";

import { UploadCoreFilesService } from "../../files/helpers/upload/upload.service";
import {
  HelpersUploadCoreFilesService,
  acceptMimeTypeImage,
  acceptMimeTypeVideo
} from "../../files/helpers/upload/helpers";
import { UploadCoreFilesArgs } from "../../files/helpers/upload/dto/upload.args";
import { core_files } from "../../admin/database/schema/files";
import { ShowCoreFiles } from "../../files/show/dto/show.obj";
import { DatabaseService } from "@/database/database.service";
import { getConfigFile } from "@/config";

interface GetFilesAfterUploadArgs extends UploadCoreEditorArgs {
  maxUploadSizeKb: number;
}

@Injectable()
export class UploadCoreEditorService extends HelpersUploadCoreFilesService {
  protected acceptMimeTypeToFrontend = [
    ...acceptMimeTypeImage,
    ...acceptMimeTypeVideo
  ];

  constructor(
    private readonly databaseService: DatabaseService,
    private readonly uploadFile: UploadCoreFilesService
  ) {
    super();
  }

  private getAcceptMineType(): string[] {
    const {
      editor: {
        files: { allow_type }
      }
    } = getConfigFile();

    if (allow_type === "images_videos") {
      return [...acceptMimeTypeImage, ...acceptMimeTypeVideo];
    }

    if (allow_type === "images") {
      return acceptMimeTypeImage;
    }

    return [];
  }

  private async getFilesAfterUpload({
    file,
    folder,
    maxUploadSizeKb,
    plugin
  }: GetFilesAfterUploadArgs) {
    const acceptMimeType = await this.getAcceptMineType();
    const allowUploadToFrontend = await this.checkAcceptMimeType({
      file,
      acceptMimeType: this.acceptMimeTypeToFrontend,
      disableThrowError: true
    });
    const args: Omit<UploadCoreFilesArgs, "acceptMimeType" | "secure"> = {
      files: [file],
      maxUploadSizeBytes: maxUploadSizeKb * 1024,
      plugin,
      folder
    };

    if (allowUploadToFrontend) {
      const current = await this.uploadFile.upload({
        ...args,
        acceptMimeType
      });

      return current[0];
    }

    const current = await this.uploadFile.upload({
      ...args,
      acceptMimeType,
      secure: true
    });

    return current[0];
  }

  async upload(
    { group, id: user_id }: User | null,
    { file, folder, plugin }: UploadCoreEditorArgs
  ): Promise<ShowCoreFiles> {
    // Check permission for upload files
    const findGroup = await this.databaseService.db.query.core_groups.findFirst(
      {
        where: (table, { eq }) => eq(table.id, group?.id ?? 1), // 1 = guest
        columns: {
          files_allow_upload: true,
          files_max_storage_for_submit: true,
          files_total_max_storage: true
        }
      }
    );

    if (!findGroup?.files_allow_upload) {
      throw new AccessDeniedError();
    }

    const countStorageUsed: number = user_id
      ? +(
          await this.databaseService.db
            .select({
              space_used: sum(core_files.file_size)
            })
            .from(core_files)
            .where(eq(core_files.user_id, user_id))
        )[0].space_used
      : 0;

    const remainingStorage =
      findGroup.files_total_max_storage - countStorageUsed;

    const maxUploadSizeKb =
      remainingStorage < findGroup.files_max_storage_for_submit &&
      remainingStorage > 0
        ? remainingStorage
        : findGroup.files_max_storage_for_submit;

    const uploadFile = await this.getFilesAfterUpload({
      file,
      plugin,
      folder,
      maxUploadSizeKb
    });

    // Save to database
    const data = await this.databaseService.db
      .insert(core_files)
      .values({
        user_id,
        ...uploadFile,
        security_key: this.acceptMimeTypeToFrontend.includes(
          uploadFile.mimetype
        )
          ? null
          : generateRandomString(32)
      })
      .returning();

    return { ...data[0], count_uses: 0 };
  }
}
