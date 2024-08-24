import { AdminPermissionGuards } from '@/utils';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminGroups } from '../show/dto/show.obj';
import { CreateAdminGroupsService } from './create.service';
import { CreateAdminGroupsArgs } from './dto/create.args';

@Resolver()
export class CreateAdminGroupsResolver {
  constructor(private readonly service: CreateAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminPermissionGuards)
  @SetMetadata('permission', 'create_group')
  async admin__core_groups__create(
    @Args() args: CreateAdminGroupsArgs,
  ): Promise<ShowAdminGroups> {
    return this.service.create(args);
  }
}
