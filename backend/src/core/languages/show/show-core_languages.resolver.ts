import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowCoreLanguageService } from './show-core_languages.service';
import { ShowCoreLanguagesArgs } from './dto/show-core_languages.args';
import { ShowCoreLanguagesObj } from './dto/show-core_languages.obj';

@Resolver()
export class ShowCoreLanguagesResolver {
  constructor(private readonly service: ShowCoreLanguageService) {}

  @Query(() => ShowCoreLanguagesObj)
  async show_core_languages(@Args() args: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    return await this.service.show(args);
  }
}
