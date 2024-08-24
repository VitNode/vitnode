import { CurrentUser, User } from '@/decorators';
import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { TestAdminEmailSettingsServiceArgs } from './dto/test.args';
import { TestAdminEmailSettingsService } from './test.service';

@Resolver()
export class TestAdminEmailSettingsResolver {
  constructor(private readonly service: TestAdminEmailSettingsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_email_settings__test(
    @Args() args: TestAdminEmailSettingsServiceArgs,
    @CurrentUser() user: User,
  ): Promise<string> {
    return this.service.test(args, user);
  }
}
