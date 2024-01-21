import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCorePluginsService } from './show.service';
import { ShowCorePluginsObj } from './dto/show.obj';
import { ShowCorePluginsArgs } from './dto/show.args';

@Resolver()
export class ShowCorePluginsResolver {
  constructor(private readonly service: ShowCorePluginsService) {}

  @Query(() => ShowCorePluginsObj)
  async core_plugins__show(@Args() args: ShowCorePluginsArgs): Promise<ShowCorePluginsObj> {
    return await this.service.show(args);
  }
}
