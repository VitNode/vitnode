import { SignUpHelperService } from '@/core/sessions/sign_up/helpers/sign-up-helper.service';
import { Module } from '@nestjs/common';

import { CreateAdminMembersResolver } from './create/create.resolver';
import { CreateAdminMembersService } from './create/create.service';
import { EditAdminMembersResolver } from './edit/edit.resolver';
import { EditAdminMembersService } from './edit/edit.service';
import { ShowAdminMembersResolver } from './show/show.resolver';
import { ShowAdminMembersService } from './show/show.service';
import { StatsAdminMembersResolver } from './stats/stats.resolver';
import { StatsAdminMembersService } from './stats/stats.service';

@Module({
  providers: [
    ShowAdminMembersResolver,
    ShowAdminMembersService,
    StatsAdminMembersResolver,
    StatsAdminMembersService,
    EditAdminMembersResolver,
    EditAdminMembersService,
    CreateAdminMembersResolver,
    CreateAdminMembersService,
    SignUpHelperService,
  ],
})
export class AdminMembersModule {}
