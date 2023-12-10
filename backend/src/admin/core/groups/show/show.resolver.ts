import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminGroupsService } from './show.service';
import { ShowAdminGroupsObj } from './dto/show.obj';
import { ShowAdminGroupsArgs } from './dto/show.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowAdminGroupsResolver {
  constructor(private readonly service: ShowAdminGroupsService) {}

  @Query(() => ShowAdminGroupsObj)
  @UseGuards(AdminAuthGuards)
  async core_groups__admin__show(@Args() args: ShowAdminGroupsArgs): Promise<ShowAdminGroupsObj> {
    return await this.service.show(args);
  }
}
