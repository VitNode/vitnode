import { Module } from "@nestjs/common";

import { EditAdminThemeEditorService } from "./edit/edit.service";
import { EditAdminThemeEditorResolver } from "./edit/edit.resolver";

@Module({
  providers: [EditAdminThemeEditorService, EditAdminThemeEditorResolver],
})
export class AdminThemeEditorModule {}
