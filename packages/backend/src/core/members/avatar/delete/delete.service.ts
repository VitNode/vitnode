import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DeleteCoreFilesService } from '../../../files/helpers/delete/delete.service';
import { DatabaseService } from '../../../../database';
import { User } from '../../../../decorators';
import { core_files_avatars } from '../../../../templates/core/admin/database/schema/users';

@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(
    private readonly deleteFile: DeleteCoreFilesService,
    private readonly databaseService: DatabaseService,
  ) {}

  async deleteAvatar({ avatar }: User): Promise<string> {
    if (!avatar) {
      return 'Avatar not found';
    }

    // Check if avatar exists
    this.deleteFile.checkIfFileExistsAndReturnPath({
      dir_folder: avatar.dir_folder,
      file_name: avatar.file_name,
      file_secure: false,
    });

    // Delete from database
    await this.databaseService.db
      .delete(core_files_avatars)
      .where(eq(core_files_avatars.id, avatar.id));

    // Delete from server
    this.deleteFile.delete(avatar);

    return 'Success!';
  }
}
