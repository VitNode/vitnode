import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminTermsSettingsService } from './delete.service';

@Resolver()
export class DeleteAdminTermsSettingsResolver {
  constructor(private readonly service: DeleteAdminTermsSettingsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_terms',
  })
  async admin__core_terms_settings__delete(
    @Args({ name: 'code', type: () => String }) code: string,
  ): Promise<string> {
    return this.service.delete({ code });
  }
}
