import { Module } from '@nestjs/common';

import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
