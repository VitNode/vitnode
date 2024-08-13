import { Injectable } from '@nestjs/common';
import { eq, sum } from 'drizzle-orm';

import { UploadCoreEditorArgs } from './dto/upload.args';

import {
  HelpersUploadCoreFilesService,
  acceptMimeTypeImage,
  acceptMimeTypeVideo,
} from '../../files/helpers/upload/helpers';
import { UploadCoreFilesArgs } from '../../files/helpers/upload/dto/upload.args';
import { ShowCoreFiles } from '../../files/show/dto/show.obj';
import { InternalDatabaseService } from '@/utils/database/internal_database.service';
import { User } from '../../../decorators';
import { AccessDeniedError } from '../../../errors';
import { core_files } from '../../../database/schema/files';
import { getConfigFile } from '../../../providers/config';
import { generateRandomString } from '@/functions/generate-random-string';
import { FilesService } from '@/core/files/helpers/upload/upload.service';

interface GetFilesAfterUploadArgs extends UploadCoreEditorArgs {
  maxUploadSizeKb: number;
}

@Injectable()
export class UploadCoreEditorService extends HelpersUploadCoreFilesService {
  protected acceptMimeTypeToFrontend = [
    ...acceptMimeTypeImage,
    ...acceptMimeTypeVideo,
  ];

  constructor(
    private readonly databaseService: InternalDatabaseService,
    private readonly files: FilesService,
  ) {
    super();
  }

  private getAcceptMineType(): string[] {
    const {
      editor: {
        files: { allow_type },
      },
    } = getConfigFile();

    if (allow_type === 'images_videos') {
      return [...acceptMimeTypeImage, ...acceptMimeTypeVideo];
    }

    if (allow_type === 'images') {
      return acceptMimeTypeImage;
    }

    return [];
  }

  private async getFilesAfterUpload({
    file,
    folder,
    maxUploadSizeKb,
    plugin,
  }: GetFilesAfterUploadArgs) {
    const acceptMimeType = this.getAcceptMineType();
    const allowUploadToFrontend = await this.checkAcceptMimeType({
      file,
      acceptMimeType: this.acceptMimeTypeToFrontend,
      disableThrowError: true,
    });
    const args: Omit<UploadCoreFilesArgs, 'acceptMimeType' | 'secure'> = {
      file,
      maxUploadSizeBytes: maxUploadSizeKb * 1024,
      plugin,
      folder,
    };

    if (allowUploadToFrontend) {
      const current = await this.files.upload({
        ...args,
        acceptMimeType,
      });

      return current[0];
    }

    const current = await this.files.upload({
      ...args,
      acceptMimeType,
      secure: true,
    });

    return current[0];
  }

  async upload(
    { file, folder, plugin }: UploadCoreEditorArgs,
    user: User | undefined,
  ): Promise<ShowCoreFiles> {
    // Check permission for upload files
    const findGroup = await this.databaseService.db.query.core_groups.findFirst(
      {
        where: (table, { eq }) => eq(table.id, user?.group.id ?? 1), // 1 = guest
        columns: {
          files_allow_upload: true,
          files_max_storage_for_submit: true,
          files_total_max_storage: true,
        },
      },
    );

    if (!findGroup?.files_allow_upload) {
      throw new AccessDeniedError();
    }

    const countStorageUsed: number = user?.id
      ? +(
          (
            await this.databaseService.db
              .select({
                space_used: sum(core_files.file_size),
              })
              .from(core_files)
              .where(eq(core_files.user_id, user.id))
          )[0].space_used ?? 0
        )
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
      maxUploadSizeKb,
    });

    // Save to database
    const data = await this.databaseService.db
      .insert(core_files)
      .values({
        user_id: user?.id,
        ...uploadFile,
        security_key: this.acceptMimeTypeToFrontend.includes(
          uploadFile.mimetype,
        )
          ? null
          : generateRandomString(32),
      })
      .returning();

    return { ...data[0], count_uses: 0 };
  }
}
