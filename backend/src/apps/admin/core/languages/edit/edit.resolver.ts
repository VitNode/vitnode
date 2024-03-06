import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminCoreLanguagesService } from "./edit.service";
import { EditCoreAdminLanguagesArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";
import { ShowCoreLanguages } from "@/src/apps/core/languages/show/dto/show.obj";

@Resolver()
export class EditAdminCoreLanguagesResolver {
  constructor(private readonly service: EditAdminCoreLanguagesService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__edit(
    @Args() args: EditCoreAdminLanguagesArgs
  ): Promise<ShowCoreLanguages> {
    return await this.service.edit(args);
  }
}
