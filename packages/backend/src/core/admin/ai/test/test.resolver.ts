import { AdminAuthGuards, AdminPermission } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TestAdminCoreAiService } from './test.service';

@Resolver()
export class TestAdminCoreAiResolver {
  constructor(private readonly service: TestAdminCoreAiService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  @AdminPermission({
    plugin_code: 'core',
    group: 'settings',
    permission: 'can_manage_settings_ai',
  })
  async admin__core_ai__test(
    @Args('prompt', { type: () => String }) prompt: string,
  ): Promise<string> {
    return this.service.test(prompt);
  }
}
