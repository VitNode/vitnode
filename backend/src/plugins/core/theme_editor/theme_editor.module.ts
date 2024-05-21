import { Module } from "@nestjs/common";

import { ShowCoreThemeEditorResolver } from "./show/show.resolver";
import { ShowCoreThemeEditorService } from "./show/show.service";

@Module({
  providers: [ShowCoreThemeEditorResolver, ShowCoreThemeEditorService]
})
export class CoreThemeEditorModule {}
