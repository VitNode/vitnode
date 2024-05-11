import { Module } from "@nestjs/common";

import { ShowCoreThemesService } from "./show/show.service";
import { ShowCoreThemesResolver } from "./show/show.resolver";
import { ChangeThemesResolver } from "./change/change.resolver";
import { ChangeCoreThemesService } from "./change/change.service";

@Module({
  providers: [
    ShowCoreThemesService,
    ShowCoreThemesResolver,
    ChangeThemesResolver,
    ChangeCoreThemesService
  ]
})
export class CoreThemesModule {}
