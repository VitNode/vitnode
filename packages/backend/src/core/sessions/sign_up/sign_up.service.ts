import { CaptchaCoreCaptchaSecurityService } from '@/core/admin/security/captcha/captcha.service';
import { AccessDeniedError } from '@/errors';
import { getConfigFile } from '@/providers';
import { GqlContext } from '@/utils';
import { Injectable } from '@nestjs/common';

import { SignUpHelperService } from './helpers/sign-up-helper.service';
import { SignUpCoreSessionsArgs, SignUpCoreSessionsObj } from './sign_up.dto';

@Injectable()
export class SignUpCoreSessionsService {
  constructor(
    private readonly captchaService: CaptchaCoreCaptchaSecurityService,
    private readonly signUpService: SignUpHelperService,
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

    return this.signUpService.signUp(args, context);
  }
}
