import { Module } from '@nestjs/common';

import { CreateAdminNavStylesResolver } from './create/create.resolver';
import { CreateAdminNavStylesService } from './create/create.service';
import { DeleteAdminNavStylesResolver } from './delete/delete.resolver';
import { DeleteAdminNavStylesService } from './delete/delete.service';
import { ChangePositionAdminNavStylesService } from './change_position/change_position.service';
import { ChangePositionAdminNavStylesResolver } from './change_position/change_position.resolver';
import { EditAdminNavStylesResolver } from './edit/edit.resolver';
import { EditAdminNavStylesService } from './edit/edit.service';

@Module({
  providers: [
    CreateAdminNavStylesResolver,
    CreateAdminNavStylesService,
    DeleteAdminNavStylesResolver,
    DeleteAdminNavStylesService,
    ChangePositionAdminNavStylesService,
    ChangePositionAdminNavStylesResolver,
    EditAdminNavStylesResolver,
    EditAdminNavStylesService,
  ],
})
export class AdminNavStylesModule {}
