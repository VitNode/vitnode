import { Module } from '@nestjs/common';

import { ShowAdminStaffAdministratorsService } from './administrators/show/show.service';
import { ShowAdminStaffAdministratorResolver } from './administrators/show/show.resolver';
import { CreateAdminStaffAdministratorsService } from './administrators/create/create.service';
import { CreateAdminStaffAdministratorResolver } from './administrators/create/create.resolver';

@Module({
  providers: [
    ShowAdminStaffAdministratorsService,
    ShowAdminStaffAdministratorResolver,
    CreateAdminStaffAdministratorsService,
    CreateAdminStaffAdministratorResolver
  ]
})
export class AdminStaffModule {}
