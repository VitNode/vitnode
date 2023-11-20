import { Module } from '@nestjs/common';

import { ShowAdminGroupsService } from './show/show-admin_groups.service';
import { ShowAdminGroupsResolver } from './show/show-admin_groups.resolver';
import { CreateAdminGroupsService } from './create/create-admin_groups.service';
import { CreateAdminGroupsResolver } from './create/create-admin_groups.resolver';

@Module({
  providers: [
    ShowAdminGroupsService,
    ShowAdminGroupsResolver,
    CreateAdminGroupsService,
    CreateAdminGroupsResolver
  ]
})
export class AdminGroupsModule {}
