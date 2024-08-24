import { Module } from '@nestjs/common';

import { DeleteAvatarCoreMembersResolver } from './delete/delete.resolver';
import { DeleteAvatarCoreMembersService } from './delete/delete.service';
import { UploadAvatarCoreMembersResolver } from './upload/upload.resolver';
import { UploadAvatarCoreMembersService } from './upload/upload.service';

@Module({
  providers: [
    UploadAvatarCoreMembersService,
    UploadAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersResolver,
    DeleteAvatarCoreMembersService,
  ],
})
export class AvatarCoreMembers {}
