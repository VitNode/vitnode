import { Module } from '@nestjs/common';

import { ShowAdminStaffAdministratorsService } from './administrators/show/show.service';
import { ShowAdminStaffAdministratorResolver } from './administrators/show/show.resolver';
import { CreateAdminStaffAdministratorsService } from './administrators/create/create.service';
import { CreateAdminStaffAdministratorResolver } from './administrators/create/create.resolver';
import { ShowAdminStaffModeratorsService } from './moderators/show/show.service';
import { ShowAdminStaffModeratorsResolver } from './moderators/show/show.resolver';
import { CreateAdminStaffModeratorsService } from './moderators/create/create.service';
import { CreateAdminStaffModeratorsResolver } from './moderators/create/create.resolver';

@Module({
  providers: [
    ShowAdminStaffAdministratorsService,
    ShowAdminStaffAdministratorResolver,
    CreateAdminStaffAdministratorsService,
    CreateAdminStaffAdministratorResolver,
    ShowAdminStaffModeratorsResolver,
    ShowAdminStaffModeratorsService,
    CreateAdminStaffModeratorsService,
    CreateAdminStaffModeratorsResolver
  ]
})
export class AdminStaffModule {}
