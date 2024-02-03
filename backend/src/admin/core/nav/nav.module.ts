import { Module } from '@nestjs/common';

import { CreateAdminNavResolver } from './create/create.resolver';
import { CreateAdminNavService } from './create/create.service';
import { DeleteAdminNavResolver } from './delete/delete.resolver';
import { DeleteAdminNavService } from './delete/delete.service';
import { ChangePositionAdminNavService } from './change_position/change_position.service';
import { ChangePositionAdminNavResolver } from './change_position/change_position.resolver';

@Module({
  providers: [
    CreateAdminNavResolver,
    CreateAdminNavService,
    DeleteAdminNavResolver,
    DeleteAdminNavService,
    ChangePositionAdminNavService,
    ChangePositionAdminNavResolver
  ]
})
export class AdminNavModule {}
