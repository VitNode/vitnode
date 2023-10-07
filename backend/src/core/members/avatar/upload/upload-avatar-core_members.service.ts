import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

import { UploadCoreAttachmentsService } from '../../../attachments/upload/upload-core_attachments.service';

@Injectable()
export class UploadAvatarCoreMembersService {
  constructor(private readonly attachments: UploadCoreAttachmentsService) {}

  async uploadAvatar({ file }: UploadAvatarCoreMembersArgs): Promise<string> {
    await this.attachments.upload({
      files: [file],
      maxUploadSizeBytes: 100,
      acceptMimeType: ['image/png', 'image/jpeg'],
      module: 'core_members',
      module_id: '1' // TODO: Add user id form current user
    });

    return 'UploadAvatarCoreMembersService';
  }
}
