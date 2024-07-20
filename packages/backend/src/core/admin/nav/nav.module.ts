import { Module } from '@nestjs/common';

import { ShowAdminNavService } from './show/show.service';
import { ShowAdminNavResolver } from './show/show.resolver';

@Module({
  providers: [ShowAdminNavService, ShowAdminNavResolver],
})
export class AdminNavModule {}
