import { Module } from '@nestjs/common';

import { ShowAdminMembersResolver } from './show/show-admin_members.resolver';
import { ShowAdminMembersService } from './show/show-admin_members.service';

@Module({
  providers: [ShowAdminMembersResolver, ShowAdminMembersService]
})
export class AdminMembersModule {}
