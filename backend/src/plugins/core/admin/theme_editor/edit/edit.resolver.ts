import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";
import { EditAdminThemeEditorService } from "./edit.service";
import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";
import { UseGuards } from "@nestjs/common";
import { Ctx } from "@/utils/types/context.type";
import { EditAdminThemeEditorArgs } from "./dto/edit.args";

@Resolver()
export class EditAdminThemeEditorResolver {
  constructor(private readonly service: EditAdminThemeEditorService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_theme_editor__edit(
    @Context() ctx: Ctx,
    @Args() args: EditAdminThemeEditorArgs
  ): Promise<string> {
    return this.service.edit(ctx, args);
  }
}
