import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreThemesService } from './show.service';
import { ShowCoreThemesObj } from './dto/show.obj';
import { ShowCoreThemesArgs } from './dto/show.args';

@Resolver()
export class ShowCoreThemesResolver {
  constructor(private readonly service: ShowCoreThemesService) {}

  @Query(() => ShowCoreThemesObj)
  async core_themes__show(@Args() args: ShowCoreThemesArgs): Promise<ShowCoreThemesObj> {
    return await this.service.show(args);
  }
}
