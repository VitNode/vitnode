import { Module } from '@nestjs/common';

import { UploadAvatarCoreMembersService } from './upload/upload-avatar-core_members.service';
import { UploadAvatarCoreMembersResolver } from './upload/upload-avatar-core_members.resolver';

@Module({
  providers: [UploadAvatarCoreMembersService, UploadAvatarCoreMembersResolver]
})
export class AvatarCoreMembers {}
