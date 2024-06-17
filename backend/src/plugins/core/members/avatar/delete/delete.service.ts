import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { User } from "@vitnode/backend";

import { DeleteCoreFilesService } from "@/plugins/core/files/helpers/delete/delete.service";
import { core_files_avatars } from "@/plugins/core/admin/database/schema/users";
import { DatabaseService } from "@/database/database.service";

@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(
    private readonly deleteFile: DeleteCoreFilesService,
    private readonly databaseService: DatabaseService
  ) {}

  async deleteAvatar({ avatar }: User): Promise<string> {
    if (!avatar) {
      return "Avatar not found";
    }

    // Check if avatar exists
    this.deleteFile.checkIfFileExistsAndReturnPath({
      dir_folder: avatar.dir_folder,
      file_name: avatar.file_name,
      file_secure: false
    });

    // Delete from database
    await this.databaseService.db
      .delete(core_files_avatars)
      .where(eq(core_files_avatars.id, avatar.id));

    // Delete from server
    this.deleteFile.delete(avatar);

    return "Success!";
  }
}
