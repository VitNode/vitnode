import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import { UploadAvatarCoreMembersArgs } from "./dto/upload.args";
import { UploadAvatarCoreMembersObj } from "./dto/upload.obj";

import { User } from "@/utils/decorators/user.decorator";
import { CustomError } from "@/utils/errors/CustomError";
import { UploadCoreFilesService } from "@/plugins/core/files/helpers/upload/upload.service";
import { DatabaseService } from "@/plugins/database/database.service";
import { currentDate } from "@/functions/date";
import { DeleteCoreFilesService } from "@/plugins/core/files/helpers/delete/delete.service";
import { core_files_avatars } from "@/plugins/core/admin/database/schema/users";

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(
    private readonly uploadFile: UploadCoreFilesService,
    private readonly deleteFile: DeleteCoreFilesService,
    private readonly databaseService: DatabaseService
  ) {}

  async uploadAvatar(
    { avatar, id }: User,
    { file }: UploadAvatarCoreMembersArgs
  ): Promise<UploadAvatarCoreMembersObj> {
    if (avatar) {
      // Check if avatar exists
      this.deleteFile.checkIfFileExists(avatar);

      // Delete from database
      await this.databaseService.db
        .delete(core_files_avatars)
        .where(eq(core_files_avatars.id, avatar.id));

      // Delete from server
      this.deleteFile.delete(avatar);
    }

    const uploadFiles = await this.uploadFile.upload({
      files: [file],
      maxUploadSizeBytes: 1e6, // 1MB,
      acceptMimeType: ["image/png", "image/jpeg"],
      plugin: "core",
      folder: "avatars"
    });

    const uploadFile = uploadFiles[0];

    if (!uploadFile) {
      throw new CustomError({
        code: "INTERNAL_SERVER_ERROR",
        message: "We could not upload your avatar. This is error from engine."
      });
    }

    // Save to database
    const recordFromDb = await this.databaseService.db
      .insert(core_files_avatars)
      .values({
        user_id: id,
        created: currentDate(),
        ...uploadFile
      })
      .returning();

    if (recordFromDb.length === 0) {
      throw new CustomError({
        code: "INTERNAL_SERVER_ERROR",
        message: "We could not upload your avatar. This is error from engine."
      });
    }

    return {
      ...recordFromDb[0],
      ...uploadFile
    };
  }
}
