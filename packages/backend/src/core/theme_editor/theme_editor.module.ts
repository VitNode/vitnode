import { Module } from "@nestjs/common";

import { ShowCoreThemeEditorResolver } from "./show/show.resolver";
import { ShowCoreThemeEditorService } from "./show/show.service";

export const keysFromCSSThemeEditor = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "background",
  "destructive",
  "destructive-foreground",
  "cover",
  "cover-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "card",
  "border"
] as const;

@Module({
  providers: [ShowCoreThemeEditorResolver, ShowCoreThemeEditorService]
})
export class CoreThemeEditorModule {}
