import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { TestAdminEmailSettingsService } from "./test.service";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { SendAdminEmailSettingsServiceArgs } from "../../send/dto/send.args";

@Resolver()
export class TestAdminEmailSettingsResolver {
  constructor(private readonly service: TestAdminEmailSettingsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_email_settings__test(
    @Args() args: SendAdminEmailSettingsServiceArgs
  ): Promise<string> {
    return this.service.test(args);
  }
}
