import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowCorePluginsObj } from './dto/show.obj';
import { ShowCorePluginsService } from './show.service';

@Resolver()
export class ShowCorePluginsResolver {
  constructor(private readonly service: ShowCorePluginsService) {}

  @SkipThrottle()
  @Query(() => [ShowCorePluginsObj])
  async core_plugins__show(): Promise<ShowCorePluginsObj[]> {
    return this.service.show();
  }
}
