import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { UpdateCoreAdminLanguagesArgs } from './dto/update.args';
import { UpdateAdminCoreLanguageService } from './update.service';

@Resolver()
export class UpdateAdminCoreLanguagesResolver {
  constructor(private readonly service: UpdateAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__update(
    @Args() args: UpdateCoreAdminLanguagesArgs,
  ): Promise<string> {
    return this.service.update(args);
  }
}
