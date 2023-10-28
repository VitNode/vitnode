import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreGroupsService } from './show-core_groups.service';
import { ShowCoreGroupsObj } from './dto/show-core_groups.obj';
import { ShowCoreGroupsArgs } from './dto/show-core_groups.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowCoreGroupsResolver {
  constructor(private readonly service: ShowCoreGroupsService) {}

  @Query(() => ShowCoreGroupsObj)
  @UseGuards(AdminAuthGuards)
  async show_core_groups(@Args() args: ShowCoreGroupsArgs): Promise<ShowCoreGroupsObj> {
    return await this.service.show(args);
  }
}
