import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CreateAdminCoreLanguageService } from "./create.service";
import { CreateCoreAdminLanguagesArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";
import { ShowCoreLanguages } from "@/src/core/languages/show/dto/show.obj";

@Resolver()
export class CreateAdminCoreLanguagesResolver {
  constructor(private readonly service: CreateAdminCoreLanguageService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__create(
    @Args() args: CreateCoreAdminLanguagesArgs
  ): Promise<ShowCoreLanguages> {
    return await this.service.create(args);
  }
}
