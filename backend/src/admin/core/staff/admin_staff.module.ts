import { Module } from '@nestjs/common';

import { ShowAdminStaffAdministratorsService } from './administrators/show/show.service';
import { ShowAdminStaffAdministratorResolver } from './administrators/show/show.resolver';

@Module({
  providers: [ShowAdminStaffAdministratorsService, ShowAdminStaffAdministratorResolver]
})
export class AdminStaffModule {}
