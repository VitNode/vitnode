import { Module } from '@nestjs/common';

import { AdminCaptchaSecurityModule } from './captcha/captcha.module';

@Module({
  imports: [AdminCaptchaSecurityModule],
})
export class AdminSecurityModule {}
