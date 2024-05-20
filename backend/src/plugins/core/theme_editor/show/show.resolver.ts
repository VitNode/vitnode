import { Context, Query, Resolver } from "@nestjs/graphql";
import { ShowCoreThemeEditorService } from "./show.service";
import { Ctx } from "@/utils/types/context.type";
import { ShowCoreThemeEditorObj } from "./dto/show.obj";

@Resolver()
export class ShowCoreThemeEditorResolver {
  constructor(private readonly service: ShowCoreThemeEditorService) {}

  @Query(() => ShowCoreThemeEditorObj)
  async core_theme_editor__show(
    @Context() ctx: Ctx
  ): Promise<ShowCoreThemeEditorObj> {
    return await this.service.show(ctx);
  }
}
