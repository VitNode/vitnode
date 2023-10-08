import { Module } from '@nestjs/common';

import { UploadAvatarCoreMembersService } from './upload/upload-avatar-core_members.service';
import { UploadAvatarCoreMembersResolver } from './upload/upload-avatar-core_members.resolver';
import { DeleteAvatarCoreMembersResolver } from './delete/delete-avatar-core_members.resolver';
import { DeleteAvatarCoreMembersService } from './delete/delete-avatar_core_members.service';

@Module({
  providers: [
    UploadAvatarCoreMembersService,
    UploadAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersService
  ]
})
export class AvatarCoreMembers {}
