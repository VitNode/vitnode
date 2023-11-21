import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminGroupsService } from './delete-admin_groups.service';
import { DeleteAdminGroupsArgs } from './dto/delete-admin_groups.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class DeleteAdminGroupsResolver {
  constructor(private readonly service: DeleteAdminGroupsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async delete_admin_groups(@Args() args: DeleteAdminGroupsArgs): Promise<string> {
    return await this.service.delete(args);
  }
}
