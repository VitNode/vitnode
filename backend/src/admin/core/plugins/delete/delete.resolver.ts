import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminPluginsService } from './delete.service';
import { DeleteAdminPluginsArgs } from './dto/delete.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class DeleteAdminPluginsResolver {
  constructor(private readonly service: DeleteAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_plugins__admin__delete(@Args() args: DeleteAdminPluginsArgs): Promise<string> {
    return await this.service.delete(args);
  }
}
