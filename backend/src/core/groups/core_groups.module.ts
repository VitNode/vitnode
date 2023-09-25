import { Module } from '@nestjs/common';

import { CreateCoreGroupsService } from './create/create-core_groups.service';
import { CreateCoreGroupsResolver } from './create/create-core_groups.resolver';

@Module({
  providers: [CreateCoreGroupsService, CreateCoreGroupsResolver]
})
export class CoreGroupsModule {}
