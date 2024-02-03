import { Module } from '@nestjs/common';

import { CreateAdminNavResolver } from './create/create.resolver';
import { CreateAdminNavService } from './create/create.service';
import { DeleteAdminNavResolver } from './delete/delete.resolver';
import { DeleteAdminNavService } from './delete/delete.service';

@Module({
  providers: [
    CreateAdminNavResolver,
    CreateAdminNavService,
    DeleteAdminNavResolver,
    DeleteAdminNavService
  ]
})
export class AdminNavModule {}
