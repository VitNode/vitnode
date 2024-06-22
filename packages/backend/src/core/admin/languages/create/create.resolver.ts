import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";

import { CreateAdminCoreLanguageService } from "./create.service";
import { CreateCoreAdminLanguagesArgs } from "./dto/create.args";

import { ShowCoreLanguages } from "../../../languages/show/dto/show.obj";
import { AdminAuthGuards } from "../../../../utils";

@Resolver()
export class CreateAdminCoreLanguagesResolver {
  constructor(private readonly service: CreateAdminCoreLanguageService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__create(
    @Args() args: CreateCoreAdminLanguagesArgs,
  ): Promise<ShowCoreLanguages> {
    return this.service.create(args);
  }
}
