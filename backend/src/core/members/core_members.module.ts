import { Module } from '@nestjs/common';

import { SignUpCoreMembersResolver } from './sign_up/sign_up.resolver';
import { SignUpCoreMembersService } from './sign_up/sign_up.service';
import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    SignUpCoreMembersResolver,
    SignUpCoreMembersService
  ],
  imports: [AvatarCoreMembers]
})
export class CoreMembersModule {}
