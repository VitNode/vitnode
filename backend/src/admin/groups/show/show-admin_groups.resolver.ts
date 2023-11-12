import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminGroupsService } from './show-admin_groups.service';
import { ShowAdminGroupsObj } from './dto/show-admin_groups.obj';
import { ShowAdminGroupsArgs } from './dto/show-admin_groups.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowAdminGroupsResolver {
  constructor(private readonly service: ShowAdminGroupsService) {}

  @Query(() => ShowAdminGroupsObj)
  @UseGuards(AdminAuthGuards)
  async show_admin_groups(@Args() args: ShowAdminGroupsArgs): Promise<ShowAdminGroupsObj> {
    return await this.service.show(args);
  }
}
