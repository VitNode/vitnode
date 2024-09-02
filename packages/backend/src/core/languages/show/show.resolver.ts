import { Args, Query, Resolver } from '@nestjs/graphql';
import { SkipThrottle } from '@nestjs/throttler';

import { ShowCoreLanguagesArgs, ShowCoreLanguagesObj } from './show.dto';
import { ShowCoreLanguageService } from './show.service';

@Resolver()
export class ShowCoreLanguagesResolver {
  constructor(private readonly service: ShowCoreLanguageService) {}

  @SkipThrottle()
  @Query(() => ShowCoreLanguagesObj)
  async core_languages__show(
    @Args() args: ShowCoreLanguagesArgs,
  ): Promise<ShowCoreLanguagesObj> {
    return this.service.show(args);
  }
}
