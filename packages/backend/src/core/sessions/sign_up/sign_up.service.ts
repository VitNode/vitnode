import { CaptchaCoreCaptchaSecurityService } from '@/core/admin/security/captcha/captcha.service';
import { GqlContext } from '@/utils';
import { Injectable } from '@nestjs/common';

import { SignUpCoreSessionsArgs } from './dto/sign_up.args';
import { SignUpCoreSessionsObj } from './dto/sign_up.obj';
import { SignUpHelperService } from './helpers/sign-up-helper.service';

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
    await this.captchaService.validateCaptcha({ req: context.req });

    return this.signUpService.signUp(args, context);
  }
}
