import { Module } from '@nestjs/common';

import { ShowAdminCaptchaSecurityResolver } from './show/show.resolver';
import { ShowAdminCaptchaSecurityService } from './show/show.service';
import { EditAdminCaptchaSecurityResolver } from './edit/edit.resolver';
import { EditAdminCaptchaSecurityService } from './edit/edit.service';

@Module({
  providers: [
    ShowAdminCaptchaSecurityResolver,
    ShowAdminCaptchaSecurityService,
    EditAdminCaptchaSecurityResolver,
    EditAdminCaptchaSecurityService,
  ],
})
export class AdminCaptchaSecurityModule {}
