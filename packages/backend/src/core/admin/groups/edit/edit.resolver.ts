import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminGroups } from '../show/dto/show.obj';
import { EditAdminGroupsArgs } from './dto/edit.args';
import { EditAdminGroupsService } from './edit.service';

@Resolver()
export class EditAdminGroupsResolver {
  constructor(private readonly service: EditAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  async admin__core_groups__edit(
    @Args() args: EditAdminGroupsArgs,
  ): Promise<ShowAdminGroups> {
    return this.service.edit(args);
  }
}
