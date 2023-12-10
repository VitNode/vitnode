import { Module } from '@nestjs/common';

import { ShowAdminGroupsService } from './show/show.service';
import { ShowAdminGroupsResolver } from './show/show.resolver';
import { CreateAdminGroupsService } from './create/create.service';
import { CreateAdminGroupsResolver } from './create/create.resolver';
import { EditAdminGroupsService } from './edit/edit.service';
import { EditAdminGroupsResolver } from './edit/edit.resolver';
import { DeleteAdminGroupsResolver } from './delete/delete.resolver';
import { DeleteAdminGroupsService } from './delete/delete.service';

@Module({
  providers: [
    ShowAdminGroupsService,
    ShowAdminGroupsResolver,
    CreateAdminGroupsService,
    CreateAdminGroupsResolver,
    EditAdminGroupsService,
    EditAdminGroupsResolver,
    DeleteAdminGroupsResolver,
    DeleteAdminGroupsService
  ]
})
export class AdminGroupsModule {}
