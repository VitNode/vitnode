import { Module } from '@nestjs/common';

import { SignUpCoreMembersResolver } from './sign_up/sign_up-core_members.resolver';
import { SignUpCoreMembersService } from './sign_up/sign_up-core_members.service';
import { ShowCoreMembersService } from './show/show-core_members.service';
import { ShowCoreMembersResolver } from './show/show-core_members.resolver';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    SignUpCoreMembersResolver,
    SignUpCoreMembersService
  ]
})
export class CoreMembersModule {}
