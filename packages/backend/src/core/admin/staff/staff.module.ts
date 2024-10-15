import { Module } from '@nestjs/common';

import { CreateEditAdminStaffAdministratorResolver } from './administrators/create-edit/create-edit.resolver';
import { CreateEditAdminStaffAdministratorsService } from './administrators/create-edit/create-edit.service';
import { DeleteAdminStaffAdministratorsResolver } from './administrators/delete/delete.resolver';
import { DeleteAdminStaffAdministratorsService } from './administrators/delete/delete.service';
import { PermissionsAdminStaffAdministratorsService } from './administrators/permissions/permissions.service';
import { ShowAdminStaffAdministratorResolver } from './administrators/show/show.resolver';
import { ShowAdminStaffAdministratorsService } from './administrators/show/show.service';
import { CreateAdminStaffModeratorsResolver } from './moderators/create/create.resolver';
import { CreateAdminStaffModeratorsService } from './moderators/create/create.service';
import { DeleteAdminStaffModeratorsResolver } from './moderators/delete/delete.resolver';
import { DeleteAdminStaffModeratorsService } from './moderators/delete/delete.service';
import { ShowAdminStaffModeratorsResolver } from './moderators/show/show.resolver';
import { ShowAdminStaffModeratorsService } from './moderators/show/show.service';

@Module({
  providers: [
    ShowAdminStaffAdministratorsService,
    ShowAdminStaffAdministratorResolver,
    CreateEditAdminStaffAdministratorsService,
    CreateEditAdminStaffAdministratorResolver,
    ShowAdminStaffModeratorsResolver,
    ShowAdminStaffModeratorsService,
    CreateAdminStaffModeratorsService,
    CreateAdminStaffModeratorsResolver,
    DeleteAdminStaffAdministratorsService,
    DeleteAdminStaffAdministratorsResolver,
    DeleteAdminStaffModeratorsService,
    DeleteAdminStaffModeratorsResolver,
    PermissionsAdminStaffAdministratorsService,
  ],
})
export class AdminStaffModule {}
