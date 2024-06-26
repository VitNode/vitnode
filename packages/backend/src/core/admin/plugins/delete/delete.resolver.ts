import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminPluginsService } from './delete.service';
import { DeleteAdminPluginsArgs } from './dto/delete.args';

import { AdminAuthGuards } from '../../../../utils';

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
