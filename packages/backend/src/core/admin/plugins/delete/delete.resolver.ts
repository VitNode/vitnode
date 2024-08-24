import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminPluginsService } from './delete.service';
import { DeleteAdminPluginsArgs } from './dto/delete.args';

@Resolver()
export class DeleteAdminPluginsResolver {
  constructor(private readonly service: DeleteAdminPluginsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__delete(
    @Args() args: DeleteAdminPluginsArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
