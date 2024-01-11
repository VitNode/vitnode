import { Injectable } from '@nestjs/common';

import { User } from '@/utils/decorators/user.decorator';
import { DeleteCoreFilesService } from '@/src/core/files/delete/delete.service';
import { DatabaseService } from '@/database/database.service';
import { core_files_avatars } from '@/src/admin/core/database/schema/files';
import { eq } from 'drizzle-orm';
@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(
    private readonly deleteFile: DeleteCoreFilesService,
    private readonly databaseService: DatabaseService
  ) {}

  async deleteAvatar({ avatar }: User): Promise<string> {
    if (!avatar) {
      return 'Avatar not found';
    }

    // Check if avatar exists
    this.deleteFile.checkIfFileExists({
      dir_folder: avatar.dir_folder,
      name: avatar.name
    });

    // Delete from database
    await this.databaseService.db
      .delete(core_files_avatars)
      .where(eq(core_files_avatars.id, avatar.id));

    // Delete from server
    this.deleteFile.delete({
      dir_folder: avatar.dir_folder,
      name: avatar.name
    });

    return 'Success!';
  }
}
