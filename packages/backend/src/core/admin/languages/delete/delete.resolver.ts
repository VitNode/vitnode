import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminCoreLanguageService } from './delete.service';

@Resolver()
export class DeleteAdminCoreLanguagesResolver {
  constructor(private readonly service: DeleteAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'languages',
    permission: 'can_manage_languages',
  })
  async admin__core_languages__delete(
    @Args('code', { type: () => String }) code: string,
  ): Promise<string> {
    return this.service.delete({ code });
  }
}
