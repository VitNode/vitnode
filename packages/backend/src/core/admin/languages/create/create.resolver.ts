import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowCoreLanguages } from '../../../languages/show/show.dto';
import { CreateCoreAdminLanguagesArgs } from './create.dto';
import { CreateAdminCoreLanguageService } from './create.service';

@Resolver()
export class CreateAdminCoreLanguagesResolver {
  constructor(private readonly service: CreateAdminCoreLanguageService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__create(
    @Args() args: CreateCoreAdminLanguagesArgs,
  ): Promise<ShowCoreLanguages> {
    return this.service.create(args);
  }
}
