import { Module } from '@nestjs/common';

import { CreateCoreMembersResolver } from './create/create-core_members.resolver';
import { CreateCoreMembersService } from './create/create-core_members.service';
import { ShowCoreMembersService } from './show/show-core_members.service';
import { ShowCoreMembersResolver } from './show/show-core_members.resolver';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    CreateCoreMembersResolver,
    CreateCoreMembersService
  ]
})
export class CoreMembersModule {}
