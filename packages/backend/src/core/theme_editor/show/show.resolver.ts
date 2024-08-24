import { Query, Resolver } from '@nestjs/graphql';

import { ShowCoreThemeEditorObj } from './dto/show.obj';
import { ShowCoreThemeEditorService } from './show.service';

@Resolver()
export class ShowCoreThemeEditorResolver {
  constructor(private readonly service: ShowCoreThemeEditorService) {}

  @Query(() => ShowCoreThemeEditorObj)
  core_theme_editor__show(): ShowCoreThemeEditorObj {
    return this.service.show();
  }
}
