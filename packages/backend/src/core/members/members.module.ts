import { Module } from '@nestjs/common';

import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
import { CreateKeyResetPasswordCoreMembersService } from './reset_password/create_key/create_key.service';
import { CreateKeyResetPasswordCoreMembersResolver } from './reset_password/create_key/create_key.resolver';
import { SetPasswordCoreMembersResolver } from './set_password/set_password.resolver';
import { SetPasswordCoreMembersService } from '../sessions/set_password.service';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
    CreateKeyResetPasswordCoreMembersService,
    CreateKeyResetPasswordCoreMembersResolver,
    SetPasswordCoreMembersResolver,
    SetPasswordCoreMembersService
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
