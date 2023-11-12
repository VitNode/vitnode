import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminGroupsService } from './create-admin_groups.service';
import { CreateAdminGroupsObj } from './dto/create-admin_groups.obj';
import { CreateAdminGroupsArgs } from './dto/create-admin_groups.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateAdminGroupsResolver {
  constructor(private readonly service: CreateAdminGroupsService) {}

  @Mutation(() => CreateAdminGroupsObj)
  @UseGuards(AdminAuthGuards)
  async create_admin_groups(@Args() args: CreateAdminGroupsArgs): Promise<CreateAdminGroupsObj> {
    return this.service.create(args);
  }
}
