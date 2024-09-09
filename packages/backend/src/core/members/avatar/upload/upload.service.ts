import { core_files_avatars } from '@/database/schema/users';
import { User } from '@/decorators';
import { CustomError } from '@/errors';
import { FileUpload } from '@/graphql-upload';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';

import { FilesService } from '../../../files/helpers/upload/upload.service';
import { UploadAvatarCoreMembersObj } from './upload.dto';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(
    private readonly files: FilesService,
    private readonly databaseService: InternalDatabaseService,
  ) {}

  async uploadAvatar(
    { avatar, id }: User,
    { file }: { file: Promise<FileUpload> },
  ): Promise<UploadAvatarCoreMembersObj> {
    if (avatar) {
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
      this.files.delete({
        dir_folder: avatar.dir_folder,
        file_name: avatar.file_name,
        secure: false,
      });
    }

    const uploadFile = await this.files.upload({
      file,
      maxUploadSizeBytes: 1e6, // 1MB,
      acceptMimeType: ['image/png', 'image/jpeg'],
      plugin: 'core',
      folder: 'avatars',
    });

    // Save to database
    const recordFromDb = await this.databaseService.db
      .insert(core_files_avatars)
      .values({
        user_id: id,
        ...uploadFile,
      })
      .returning();

    if (recordFromDb.length === 0) {
      throw new CustomError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'We could not upload your avatar. This is error from engine.',
      });
    }

    return {
      ...recordFromDb[0],
      ...uploadFile,
    };
  }
}
