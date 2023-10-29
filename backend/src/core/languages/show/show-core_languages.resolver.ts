import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowCoreLanguageService } from './show-core_languages.service';
import { ShowCoreLanguagesArgs } from './dto/show-core_languages.args';
import { ShowCoreLanguagesObj } from './dto/show-core_languages.obj';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowCoreLanguagesResolver {
  constructor(private readonly service: ShowCoreLanguageService) {}

  @Query(() => ShowCoreLanguagesObj)
  @UseGuards(AdminAuthGuards)
  async show_core_languages(@Args() args: ShowCoreLanguagesArgs): Promise<ShowCoreLanguagesObj> {
    return await this.service.show(args);
  }
}
