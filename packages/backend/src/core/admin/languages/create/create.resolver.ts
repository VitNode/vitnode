import { AdminAuthGuards, AdminPermission } from '@/utils';
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
  @AdminPermission({
    plugin_code: 'core',
    group: 'languages',
    permission: 'can_manage_languages',
  })
  async admin__core_languages__create(
    @Args() args: CreateCoreAdminLanguagesArgs,
  ): Promise<ShowCoreLanguages> {
    return this.service.create(args);
  }
}
