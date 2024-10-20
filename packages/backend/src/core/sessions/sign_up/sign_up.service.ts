import { EmailService } from '@/core/admin/email/email.service';
import { CaptchaCoreCaptchaSecurityService } from '@/core/admin/security/captcha/captcha.service';
import { AccessDeniedError } from '@/errors';
import { getConfigFile } from '@/providers';
import { GqlContext } from '@/utils';
import { Injectable } from '@nestjs/common';

import { SendConfirmEmailCoreSessionsService } from '../confirm_email/send.confirm_email.service';
import { SignUpHelperService } from './helpers/sign-up-helper.service';
import { SignUpCoreSessionsArgs, SignUpCoreSessionsObj } from './sign_up.dto';

@Injectable()
export class SignUpCoreSessionsService {
  constructor(
    private readonly captchaService: CaptchaCoreCaptchaSecurityService,
    private readonly signUpService: SignUpHelperService,
    private readonly confirmEmailService: SendConfirmEmailCoreSessionsService,
    private readonly mailService: EmailService,
  ) {}

  async signUp(
    args: SignUpCoreSessionsArgs,
    context: GqlContext,
  ): Promise<SignUpCoreSessionsObj> {
    const config = getConfigFile();
    if (config.settings.authorization.lock_register) {
      throw new AccessDeniedError();
    }
    await this.captchaService.validateCaptcha({ req: context.req });
    const user = await this.signUpService.signUp(args, context);

    if (
      config.settings.authorization.require_confirm_email &&
      !user.email_verified &&
      this.mailService.checkIfEnable()
    ) {
      await this.confirmEmailService.sendConfirmEmail({
        userId: user.id,
      });
    }

    return user;
  }
}
