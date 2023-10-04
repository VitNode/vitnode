import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '../../../attachments/upload/upload-core_attachments.service';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(private readonly attachments: UploadCoreAttachmentsService) {}

  async uploadAvatar({ file, user_id }: UploadAvatarCoreMembersArgs): Promise<string> {
    await this.attachments.upload({
      files: [file],
      maxUploadSizeBytes: 100,
      acceptMimeType: ['image/png', 'image/jpeg']
    });

    return 'UploadAvatarCoreMembersService';
  }
}
