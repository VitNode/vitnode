import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { EditAdminThemeEditorService } from "./edit.service";
import { EditAdminThemeEditorArgs } from "./dto/edit.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class EditAdminThemeEditorResolver {
  constructor(private readonly service: EditAdminThemeEditorService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_theme_editor__edit(
    @Args() args: EditAdminThemeEditorArgs
  ): Promise<string> {
    return this.service.edit(args);
  }
}
