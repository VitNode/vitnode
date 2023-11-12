import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminMembersService } from './show-admin_members.service';
import { ShowAdminMembersObj } from './dto/show-admin_members.obj';
import { ShowAdminMembersArgs } from './dto/show-admin_members.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowAdminMembersResolver {
  constructor(private readonly service: ShowAdminMembersService) {}

  @Query(() => ShowAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  async show_admin_members(@Args() args: ShowAdminMembersArgs): Promise<ShowAdminMembersObj> {
    return await this.service.show(args);
  }
}
