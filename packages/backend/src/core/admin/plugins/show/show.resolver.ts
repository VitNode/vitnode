import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowAdminPluginsArgs } from './dto/show.args';
import { ShowAdminPluginsObj } from './dto/show.obj';
import { ShowAdminPluginsService } from './show.service';

@Resolver()
export class ShowAdminPluginsResolver {
  constructor(private readonly service: ShowAdminPluginsService) {}

  @Query(() => ShowAdminPluginsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_plugins__show(
    @Args() args: ShowAdminPluginsArgs,
  ): Promise<ShowAdminPluginsObj> {
    return this.service.show(args);
  }
}
