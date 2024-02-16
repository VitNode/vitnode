import { Module } from "@nestjs/common";

import { CreateAdminCoreLanguageService } from "./create/create.service";
import { CreateAdminCoreLanguagesResolver } from "./create/create.resolver";
import { EditAdminCoreLanguagesResolver } from "./edit/edit.resolver";
import { EditAdminCoreLanguagesService } from "./edit/edit.service";

@Module({
  providers: [
    CreateAdminCoreLanguageService,
    CreateAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesResolver,
    EditAdminCoreLanguagesService
  ]
})
export class AdminLanguagesModule {}
