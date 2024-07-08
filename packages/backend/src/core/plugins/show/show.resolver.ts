import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowCorePluginsService } from './show.service';
import { ShowCorePluginsObj } from './dto/show.obj';

@Resolver()
export class ShowCorePluginsResolver {
  constructor(private readonly service: ShowCorePluginsService) {}

  @SkipThrottle()
  @Query(() => [ShowCorePluginsObj])
  async core_plugins__show(): Promise<ShowCorePluginsObj[]> {
    return this.service.show();
  }
}
