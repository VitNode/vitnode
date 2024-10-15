import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminGroups } from '../show/show.dto';
import { CreateAdminGroupsArgs } from './create.dto';
import { CreateAdminGroupsService } from './create.service';

@Resolver()
export class CreateAdminGroupsResolver {
  constructor(private readonly service: CreateAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  // @UseGuards(AdminPermissionGuards)
  // @SetMetadata('permission', 'create_group')
  async admin__core_groups__create(
    @Args() args: CreateAdminGroupsArgs,
  ): Promise<ShowAdminGroups> {
    return this.service.create(args);
  }
}
