import { Module } from '@nestjs/common';

import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
import { ChangePasswordCoreMembersResolver } from './reset_password/change_password/change_password.resolver';
import { ChangePasswordCoreMembersService } from './reset_password/change_password/change_password.service';
import { CreateKeyResetPasswordCoreMembersResolver } from './reset_password/create_key/create_key.resolver';
import { CreateKeyResetPasswordCoreMembersService } from './reset_password/create_key/create_key.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { ShowCoreMembersService } from './show/show.service';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
    CreateKeyResetPasswordCoreMembersService,
    CreateKeyResetPasswordCoreMembersResolver,
    ChangePasswordCoreMembersResolver,
    ChangePasswordCoreMembersService,
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
