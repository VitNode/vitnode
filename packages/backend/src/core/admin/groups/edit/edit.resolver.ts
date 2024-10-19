import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminGroups } from '../show/show.dto';
import { EditAdminGroupsArgs } from './edit.dto';
import { EditAdminGroupsService } from './edit.service';

@Resolver()
export class EditAdminGroupsResolver {
  constructor(private readonly service: EditAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'can_manage_groups',
    permission: '',
  })
  async admin__core_groups__edit(
    @Args() args: EditAdminGroupsArgs,
  ): Promise<ShowAdminGroups> {
    return this.service.edit(args);
  }
}
