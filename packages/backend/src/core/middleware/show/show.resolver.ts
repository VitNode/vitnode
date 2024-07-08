import { Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowCoreMiddlewareService } from './show.service';
import { ShowCoreMiddlewareObj } from './dto/show.obj';

@Resolver()
export class ShowCoreMiddlewareResolver {
  constructor(private readonly service: ShowCoreMiddlewareService) {}

  @SkipThrottle()
  @Query(() => ShowCoreMiddlewareObj)
  async core_middleware__show(): Promise<ShowCoreMiddlewareObj> {
    return this.service.show();
  }
}
