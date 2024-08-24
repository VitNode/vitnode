import { Module } from '@nestjs/common';

import { CreateAdminGroupsResolver } from './create/create.resolver';
import { CreateAdminGroupsService } from './create/create.service';
import { DeleteAdminGroupsResolver } from './delete/delete.resolver';
import { DeleteAdminGroupsService } from './delete/delete.service';
import { EditAdminGroupsResolver } from './edit/edit.resolver';
import { EditAdminGroupsService } from './edit/edit.service';
import { ShowAdminGroupsResolver } from './show/show.resolver';
import { ShowAdminGroupsService } from './show/show.service';

@Module({
  providers: [
    ShowAdminGroupsService,
    ShowAdminGroupsResolver,
    CreateAdminGroupsService,
    CreateAdminGroupsResolver,
    EditAdminGroupsService,
    EditAdminGroupsResolver,
    DeleteAdminGroupsResolver,
    DeleteAdminGroupsService,
  ],
})
export class AdminGroupsModule {}
