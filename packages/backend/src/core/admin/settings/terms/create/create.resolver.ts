import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateAdminTermsSettingsArgs } from './create.dto';
import { CreateAdminTermsSettingsService } from './create.service';

@Resolver()
export class CreateAdminTermsSettingsResolver {
  constructor(private readonly service: CreateAdminTermsSettingsService) {}

  @Mutation(() => ShowCoreTerms)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_terms',
  })
  async admin__core_terms_settings__create(
    @Args() args: CreateAdminTermsSettingsArgs,
  ): Promise<ShowCoreTerms> {
    return this.service.create(args);
  }
}
