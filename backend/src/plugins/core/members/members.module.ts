import { Module } from "@nestjs/common";

import { SignUpCoreMembersResolver } from "./sign_up/sign_up.resolver";
import { SignUpCoreMembersService } from "./sign_up/sign_up.service";
import { ShowCoreMembersService } from "./show/show.service";
import { ShowCoreMembersResolver } from "./show/show.resolver";
import { AvatarCoreMembers } from "./avatar/avatar-core_members.module";
import { DeleteCoreMembersResolver } from "./delete/delete.resolver";
import { DeleteCoreMembersService } from "./delete/delete.service";
import { ResetPasswordCoreMembersResolver } from "./reset_password/reset_password.resolver";
import { ChangePasswordCoreMembersResolver } from "./change_password/change_password.resolver";
import { ChangePasswordCoreMembersService } from "./change_password/change_password.service";
import { ResetPasswordCoreMembersService } from "./reset_password/reset_password.service";
import { SendAdminEmailService } from "../admin/email/send/send.service";
import { MailService } from "../admin/email/mail.service";

@Module({
  providers: [
    ShowCoreMembersResolver,
    ShowCoreMembersService,
    SignUpCoreMembersResolver,
    SignUpCoreMembersService,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
    ResetPasswordCoreMembersResolver,
    ResetPasswordCoreMembersService,
    ChangePasswordCoreMembersResolver,
    ChangePasswordCoreMembersService,
    MailService,
    SendAdminEmailService
  ],
  imports: [AvatarCoreMembers]
})
export class CoreMembersModule {}
