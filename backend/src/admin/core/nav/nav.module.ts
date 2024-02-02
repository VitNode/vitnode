import { Module } from '@nestjs/common';

import { CreateAdminNavResolver } from './create/create.resolver';
import { CreateAdminNavService } from './create/create.service';

@Module({
  providers: [CreateAdminNavResolver, CreateAdminNavService]
})
export class AdminNavModule {}
