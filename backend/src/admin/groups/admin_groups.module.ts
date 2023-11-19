import { Module } from '@nestjs/common';

import { ShowAdminGroupsService } from './show/show-admin_groups.service';
import { ShowAdminGroupsResolver } from './show/show-admin_groups.resolver';

@Module({
  providers: [ShowAdminGroupsService, ShowAdminGroupsResolver]
})
export class AdminGroupsModule {}
