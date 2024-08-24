import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreNavArgs } from './dto/show.args';
import { ShowCoreNavObj } from './dto/show.obj';
import { ShowCoreNavService } from './show.service';

@Resolver()
export class ShowCoreNavResolver {
  constructor(private readonly service: ShowCoreNavService) {}

  @Query(() => ShowCoreNavObj)
  async core_nav__show(@Args() args: ShowCoreNavArgs): Promise<ShowCoreNavObj> {
    return this.service.show(args);
  }
}
