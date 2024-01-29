import { Module } from '@nestjs/common';

import { ShowCoreThemesService } from './show/show.service';
import { ShowAdminThemesResolver } from './show/show.resolver';

@Module({
  providers: [ShowCoreThemesService, ShowAdminThemesResolver]
})
export class CoreThemesModule {}
