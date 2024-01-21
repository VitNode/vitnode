import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ChangePositionAdminPluginsArgs } from './dto/change_position.args';
import { ChangePositionAdminPluginsService } from './change_position.service';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ChangePositionAdminPluginsResolver {
  constructor(private readonly service: ChangePositionAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__change_position(
    @Args() args: ChangePositionAdminPluginsArgs
  ): Promise<string> {
    return await this.service.changeOrderingForumForums(args);
  }
}
