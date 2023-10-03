import { Injectable } from '@nestjs/common';

import { UploadAvatarCoreMembersArgs } from './dto/upload-avatar-core_members.args';

@Injectable()
export class UploadAvatarCoreMembersService {
  async uploadAvatar({ file, user_id }: UploadAvatarCoreMembersArgs): Promise<string> {
    return 'UploadAvatarCoreMembersService';
  }
}
