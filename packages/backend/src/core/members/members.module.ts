import { Module } from '@nestjs/common';

import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
import { CreateKeyResetPasswordCoreMembersService } from './reset_password/create_key/create_key.service';
import { CreateKeyResetPasswordCoreMembersResolver } from './reset_password/create_key/create_key.resolver';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
    CreateKeyResetPasswordCoreMembersService,
    CreateKeyResetPasswordCoreMembersResolver,
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
