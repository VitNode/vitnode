import { Module } from '@nestjs/common';

import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
import { MailService } from '../admin/email/mail.service';
import { SendAdminEmailService } from '../admin/email/send/send.service';
import { ChangePasswordCoreMembersResolver } from './change_password/change_password.resolver';
import { ChangePasswordCoreMembersService } from './change_password/change_password.service';
import { ResetPasswordCoreMembersResolver } from './reset_password/reset_password.resolver';
import { ResetPasswordCoreMembersService } from './reset_password/reset_password.service';

@Module({
  providers: [
    ShowCoreMembersService,
    ShowCoreMembersResolver,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
    ResetPasswordCoreMembersResolver,
    ResetPasswordCoreMembersService,
    ChangePasswordCoreMembersResolver,
    ChangePasswordCoreMembersService,
    MailService,
    SendAdminEmailService,
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
