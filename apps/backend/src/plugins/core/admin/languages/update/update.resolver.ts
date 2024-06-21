import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { UpdateAdminCoreLanguageService } from "./update.service";
import { UpdateCoreAdminLanguagesArgs } from "./dto/update.args";

@Resolver()
export class UpdateAdminCoreLanguagesResolver {
  constructor(private readonly service: UpdateAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__update(
    @Args() args: UpdateCoreAdminLanguagesArgs
  ): Promise<string> {
    return this.service.update(args);
  }
}
