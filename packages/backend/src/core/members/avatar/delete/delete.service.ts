import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { DatabaseService } from '@/utils/database/database.service';
import { User } from '@/decorators';
import { core_files_avatars } from '@/database/schema/users';
import { FilesService } from '@/core/files/helpers/upload/upload.service';

@Injectable()
export class DeleteAvatarCoreMembersService {
  constructor(
    private readonly files: FilesService,
    private readonly databaseService: DatabaseService,
  ) {}

  async deleteAvatar({ avatar }: User): Promise<string> {
    if (!avatar) {
      return 'Avatar not found';
    }

    // Check if avatar exists
    this.files.checkIfFileExistsAndReturnPath({
      dir_folder: avatar.dir_folder,
      file_name: avatar.file_name,
      secure: false,
    });

    // Delete from database
    await this.databaseService.db
      .delete(core_files_avatars)
      .where(eq(core_files_avatars.id, avatar.id));

    // Delete from server
    this.files.delete(avatar);

    return 'Success!';
  }
}
