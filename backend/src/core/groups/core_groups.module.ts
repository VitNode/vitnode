import { Module } from '@nestjs/common';

import { CreateCoreGroupsService } from './create/create-core_groups.service';
import { CreateCoreGroupsResolver } from './create/create-core_groups.resolver';
import { ShowCoreGroupsService } from './show/show-core_groups.service';
import { ShowCoreGroupsResolver } from './show/show-core_groups.resolver';

@Module({
  providers: [
    CreateCoreGroupsService,
    CreateCoreGroupsResolver,
    ShowCoreGroupsService,
    ShowCoreGroupsResolver
  ]
})
export class CoreGroupsModule {}
