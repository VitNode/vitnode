import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminMembersArgs, EditAdminMembersObj } from './edit.dto';
import { EditAdminMembersService } from './edit.service';

@Resolver()
export class EditAdminMembersResolver {
  constructor(private readonly service: EditAdminMembersService) {}

  @Mutation(() => EditAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'members',
    group: 'users',
    permission: 'can_manage_members',
  })
  async admin__core_members__edit(
    @Args() args: EditAdminMembersArgs,
  ): Promise<EditAdminMembersObj> {
    return this.service.edit(args);
  }
}
