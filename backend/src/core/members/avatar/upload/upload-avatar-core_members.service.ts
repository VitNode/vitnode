import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '../../../attachments/upload/upload-core_attachments.service';
import { User } from '@/utils/decorators/user.decorator';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(private readonly attachments: UploadCoreAttachmentsService) {}

  async uploadAvatar({ id }: User, { file }: UploadAvatarCoreMembersArgs): Promise<string> {
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
