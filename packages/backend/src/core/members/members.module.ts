import { Module } from '@nestjs/common';

import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
import { CreateKeyResetPasswordCoreMembersService } from './reset_password/create_key/create_key.service';
import { CreateKeyResetPasswordCoreMembersResolver } from './reset_password/create_key/create_key.resolver';
import { ChangePasswordCoreMembersResolver } from './reset_password/change_password/change_password.resolver';
import { ChangePasswordCoreMembersService } from './reset_password/change_password/change_password.service';

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
