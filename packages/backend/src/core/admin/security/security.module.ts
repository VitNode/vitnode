import { Global, Module } from '@nestjs/common';

import { AdminCaptchaSecurityModule } from './captcha/captcha.module';
import { CaptchaCoreCaptchaSecurityService } from './captcha/captcha.service';

@Module({
  imports: [AdminCaptchaSecurityModule],
})
export class AdminSecurityModule {}

@Global()
@Module({
  providers: [CaptchaCoreCaptchaSecurityService],
  exports: [CaptchaCoreCaptchaSecurityService],
})
export class GlobalAdminSecurityModule {}
