import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { CreateAdminGroupsService } from './create-admin_groups.service';
import { CreateAdminGroupsArgs } from './dto/create-admin_groups.args';
import { ShowAdminGroups } from '../show/dto/show-admin_groups.obj';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class CreateAdminGroupsResolver {
  constructor(private readonly service: CreateAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  async create_admin_groups(@Args() args: CreateAdminGroupsArgs): Promise<ShowAdminGroups> {
    return await this.service.create(args);
  }
}
