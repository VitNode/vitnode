import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreLanguageService } from './show.service';
import { ShowCoreLanguagesArgs } from './dto/show.args';
import { ShowCoreLanguagesObj } from './dto/show.obj';

@Resolver()
export class ShowCoreLanguagesResolver {
  constructor(private readonly service: ShowCoreLanguageService) {}

  @Query(() => ShowCoreLanguagesObj)
  async core_languages__show(@Args() args: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    return await this.service.show(args);
  }
}
