import { Module } from '@nestjs/common';

import { ChangePositionAdminNavPluginsResolver } from './change_position/change_position.resolver';
import { ChangePositionAdminNavPluginsService } from './change_position/change_position.service';
import { CreateAdminNavPluginsResolver } from './create/create.resolver';
import { CreateAdminNavPluginsService } from './create/create.service';
import { DeleteAdminNavPluginsResolver } from './delete/delete.resolver';
import { DeleteAdminNavPluginsService } from './delete/delete.service';
import { EditAdminNavPluginsResolver } from './edit/edit.resolver';
import { EditAdminNavPluginsService } from './edit/edit.service';
import { ShowAdminNavPluginsResolver } from './show/show.resolver';
import { ShowAdminNavPluginsService } from './show/show.service';

@Module({
  providers: [
    ShowAdminNavPluginsService,
    ShowAdminNavPluginsResolver,
    CreateAdminNavPluginsService,
    CreateAdminNavPluginsResolver,
    ChangePositionAdminNavPluginsResolver,
    ChangePositionAdminNavPluginsService,
    EditAdminNavPluginsResolver,
    EditAdminNavPluginsService,
    DeleteAdminNavPluginsResolver,
    DeleteAdminNavPluginsService,
  ],
})
export class AdminNavPluginsModule {}
