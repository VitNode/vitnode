import { Module } from '@nestjs/common';

import { ShowAdminThemesService } from './show/show.service';
import { ShowAdminThemesResolver } from './show/show.resolver';

@Module({
  providers: [ShowAdminThemesService, ShowAdminThemesResolver]
})
export class AdminThemesModule {}
