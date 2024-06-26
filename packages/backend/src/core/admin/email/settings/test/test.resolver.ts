import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { TestAdminEmailSettingsService } from './test.service';
import { TestAdminEmailSettingsServiceArgs } from './dto/test.args';

import { AdminAuthGuards } from '../../../../../utils';

@Resolver()
export class TestAdminEmailSettingsResolver {
  constructor(private readonly service: TestAdminEmailSettingsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_email_settings__test(
    @Args() args: TestAdminEmailSettingsServiceArgs,
  ): Promise<string> {
    return this.service.test(args);
  }
}
