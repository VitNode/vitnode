import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '@/src/core/attachments/upload/upload-core_attachments.service';
import { User } from '@/utils/decorators/user.decorator';
import { PrismaService } from '@/prisma/prisma.service';
import { DeleteCoreAttachmentsService } from '../../../attachments/delete/delete-core_attachments.service';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(
    private readonly uploadFile: UploadCoreAttachmentsService,
    private readonly deleteFile: DeleteCoreAttachmentsService,
    private readonly prisma: PrismaService
  ) {}

  async uploadAvatar({ id }: User, { file }: UploadAvatarCoreMembersArgs): Promise<string> {
    // Check if the user already has an avatar
    const avatar = await this.prisma.core_attachments.findFirst({
      where: {
        module: 'core_members',
        module_id: id
      }
    });

    if (avatar) {
      await this.deleteFile.deleteFile({
        module: {
          module: 'core_members',
          id: id
        }
      });
    }

    await this.uploadFile.upload({
      files: [
        {
          file,
          description: 'Avatar',
          position: 0
        }
      ],
      maxUploadSizeBytes: 1e6, // 1MB
      acceptMimeType: ['image/png', 'image/jpeg'],
      module: 'core_members',
      module_id: id
    });

    return 'Success!';
  }
}
