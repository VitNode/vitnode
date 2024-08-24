import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminMembersArgs } from './dto/edit.args';
import { EditAdminMembersObj } from './dto/edit.obj';
import { EditAdminMembersService } from './edit.service';

@Resolver()
export class EditAdminMembersResolver {
  constructor(private readonly service: EditAdminMembersService) {}

  @Mutation(() => EditAdminMembersObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_members__edit(
    @Args() args: EditAdminMembersArgs,
  ): Promise<EditAdminMembersObj> {
    return this.service.edit(args);
  }
}
