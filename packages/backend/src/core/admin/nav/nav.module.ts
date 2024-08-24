import { Module } from '@nestjs/common';

import { ShowAdminNavResolver } from './show/show.resolver';
import { ShowAdminNavService } from './show/show.service';

@Module({
  providers: [ShowAdminNavService, ShowAdminNavResolver],
  exports: [ShowAdminNavService],
})
export class AdminNavModule {}
