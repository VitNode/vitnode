import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { AdminAuthGuards } from "vitnode-backend";

import { EditAdminCoreLanguagesService } from "./edit.service";
import { EditCoreAdminLanguagesArgs } from "./dto/edit.args";

import { ShowCoreLanguages } from "@/plugins/core/languages/show/dto/show.obj";

@Resolver()
export class EditAdminCoreLanguagesResolver {
  constructor(private readonly service: EditAdminCoreLanguagesService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__edit(
    @Args() args: EditCoreAdminLanguagesArgs
  ): Promise<ShowCoreLanguages> {
    return this.service.edit(args);
  }
}
