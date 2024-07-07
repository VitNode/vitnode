import { Module } from '@nestjs/common';

import { ShowAdminCaptchaSecurityResolver } from './show/show.resolver';
import { ShowAdminCaptchaSecurityService } from './show/show.service';

@Module({
  providers: [
    ShowAdminCaptchaSecurityResolver,
    ShowAdminCaptchaSecurityService,
  ],
})
export class AdminCaptchaSecurityModule {}
