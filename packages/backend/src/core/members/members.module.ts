import { Module } from '@nestjs/common';

<<<<<<< HEAD
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
=======
import { SignUpCoreMembersResolver } from './sign_up/sign_up.resolver';
import { SignUpCoreMembersService } from './sign_up/sign_up.service';
import { ShowCoreMembersService } from './show/show.service';
import { ShowCoreMembersResolver } from './show/show.resolver';
import { AvatarCoreMembers } from './avatar/avatar-core_members.module';
import { DeleteCoreMembersResolver } from './delete/delete.resolver';
import { DeleteCoreMembersService } from './delete/delete.service';
>>>>>>> 1b3c841d (chore: Change prettier singleQuote to true)

@Module({
  providers: [
    ShowCoreMembersResolver,
    ShowCoreMembersService,
    SignUpCoreMembersResolver,
    SignUpCoreMembersService,
    DeleteCoreMembersResolver,
    DeleteCoreMembersService,
<<<<<<< HEAD
    ResetPasswordCoreMembersResolver,
    ResetPasswordCoreMembersService,
    ChangePasswordCoreMembersResolver,
    ChangePasswordCoreMembersService,
    MailService,
    SendAdminEmailService
=======
>>>>>>> 95500191 (chore: Change prettier config)
  ],
  imports: [AvatarCoreMembers],
})
export class CoreMembersModule {}
