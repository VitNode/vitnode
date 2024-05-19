import { Context, Query, Resolver } from "@nestjs/graphql";
import { ShowCoreThemeEditorService } from "./show.service";
import { Ctx } from "@/utils/types/context.type";
import { ShowCoreThemeEditor } from "./dto/show.obj";

@Resolver()
export class ShowCoreThemeEditorResolver {
  constructor(private readonly service: ShowCoreThemeEditorService) {}

  @Query(() => ShowCoreThemeEditor)
  async core_theme_editor__show(
    @Context() ctx: Ctx
  ): Promise<ShowCoreThemeEditor> {
    return this.service.show(ctx);
  }
}
