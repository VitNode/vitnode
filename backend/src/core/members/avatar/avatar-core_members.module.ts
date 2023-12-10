import { Module } from '@nestjs/common';

import { UploadAvatarCoreMembersService } from './upload/upload-avatar.service';
import { UploadAvatarCoreMembersResolver } from './upload/upload-avatar.resolver';
import { DeleteAvatarCoreMembersResolver } from './delete/delete.resolver';
import { DeleteAvatarCoreMembersService } from './delete/delete.service';

@Module({
  providers: [
    UploadAvatarCoreMembersService,
    UploadAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersService
  ]
})
export class AvatarCoreMembers {}
