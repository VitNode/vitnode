import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowAdminGroups } from '../show/dto/show-admin_groups.obj';
import { EditAdminGroupsService } from './edit-admin_groups.service';
import { EditAdminGroupsArgs } from './dto/edit-admin_groups.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class EditAdminGroupsResolver {
  constructor(private readonly service: EditAdminGroupsService) {}

  @Mutation(() => ShowAdminGroups)
  @UseGuards(AdminAuthGuards)
  async edit_admin_groups(@Args() args: EditAdminGroupsArgs): Promise<ShowAdminGroups> {
    return await this.service.edit(args);
  }
}
