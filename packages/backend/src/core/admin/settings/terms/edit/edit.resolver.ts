import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminTermsSettingsArgs } from './edit.dto';
import { EditAdminTermsSettingsService } from './edit.service';

@Resolver()
export class EditAdminTermsSettingsResolver {
  constructor(private readonly service: EditAdminTermsSettingsService) {}

  @Mutation(() => ShowCoreTerms)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_terms',
  })
  async admin__core_terms_settings__edit(
    @Args() args: EditAdminTermsSettingsArgs,
  ): Promise<ShowCoreTerms> {
    return this.service.edit(args);
  }
}
