import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowCoreMiddlewareObj } from './show.dto';
import { ShowCoreMiddlewareService } from './show.service';

@Resolver()
export class ShowCoreMiddlewareResolver {
  constructor(private readonly service: ShowCoreMiddlewareService) {}

  @SkipThrottle()
  @Query(() => ShowCoreMiddlewareObj)
  async core_middleware__show(): Promise<ShowCoreMiddlewareObj> {
    return this.service.show();
  }
}
