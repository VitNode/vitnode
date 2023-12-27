import { Module } from '@nestjs/common';

import { ShowAdminStaffAdministratorsService } from './administrators/show/show.service';
import { ShowAdminStaffAdministratorResolver } from './administrators/show/show.resolver';
import { CreateAdminStaffAdministratorsService } from './administrators/create/create.service';
import { CreateAdminStaffAdministratorResolver } from './administrators/create/create.resolver';
import { ShowAdminStaffModeratorsService } from './moderators/show/show.service';
import { ShowAdminStaffModeratorsResolver } from './moderators/show/show.resolver';
import { CreateAdminStaffModeratorsService } from './moderators/create/create.service';
import { CreateAdminStaffModeratorsResolver } from './moderators/create/create.resolver';
import { DeleteAdminStaffAdministratorsService } from './administrators/delete/delete.service';
import { DeleteAdminStaffAdministratorResolver } from './administrators/delete/delete.resolver';

@Module({
  providers: [
    ShowAdminStaffAdministratorsService,
    ShowAdminStaffAdministratorResolver,
    CreateAdminStaffAdministratorsService,
    CreateAdminStaffAdministratorResolver,
    ShowAdminStaffModeratorsResolver,
    ShowAdminStaffModeratorsService,
    CreateAdminStaffModeratorsService,
    CreateAdminStaffModeratorsResolver,
    DeleteAdminStaffAdministratorsService,
    DeleteAdminStaffAdministratorResolver
  ]
})
export class AdminStaffModule {}
