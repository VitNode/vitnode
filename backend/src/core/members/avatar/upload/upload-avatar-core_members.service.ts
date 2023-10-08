import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '@/src/core/attachments/upload/upload-core_attachments.service';
import { User } from '@/utils/decorators/user.decorator';
import { PrismaService } from '@/src/prisma/prisma.service';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(
    private readonly attachments: UploadCoreAttachmentsService,
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

    // If the user already has an avatar, delete it

    await this.attachments.upload({
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
