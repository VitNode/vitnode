import { Context, Query, Resolver } from "@nestjs/graphql";
import { Ctx } from "@vitnode/backend";

import { ShowCoreThemeEditorService } from "./show.service";
import { ShowCoreThemeEditorObj } from "./dto/show.obj";

@Resolver()
export class ShowCoreThemeEditorResolver {
  constructor(private readonly service: ShowCoreThemeEditorService) {}

  @Query(() => ShowCoreThemeEditorObj)
  async core_theme_editor__show(
    @Context() ctx: Ctx
  ): Promise<ShowCoreThemeEditorObj> {
    return this.service.show(ctx);
  }
}
