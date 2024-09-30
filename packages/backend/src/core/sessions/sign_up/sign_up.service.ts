import { CaptchaCoreCaptchaSecurityService } from '@/core/admin/security/captcha/captcha.service';
import { AccessDeniedError } from '@/errors';
import { EmailProvider, getConfigFile } from '@/providers';
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
      config.settings.email.provider !== EmailProvider.none
    ) {
      await this.confirmEmailService.sendConfirmEmail({
        userId: user.id,
      });
    }

    return user;
  }
}
