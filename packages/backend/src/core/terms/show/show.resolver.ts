import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreTermsArgs, ShowCoreTermsObj } from './show.dto';
import { ShowCoreTermsService } from './show.service';

@Resolver()
export class ShowCoreTermsResolver {
  constructor(private readonly service: ShowCoreTermsService) {}

  @Query(() => ShowCoreTermsObj)
  async core_terms__show(
    @Args() args: ShowCoreTermsArgs,
  ): Promise<ShowCoreTermsObj> {
    return this.service.show(args);
  }
}
