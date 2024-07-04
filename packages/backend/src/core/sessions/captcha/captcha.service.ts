import { Injectable } from '@nestjs/common';

import { Ctx } from '../../../utils';
import { CustomError } from '../../../errors';
import { getUserIp } from '../../../functions';

@Injectable()
export class CaptchaCoreSessionsService {
  private async getResFromReCaptcha({
    captchaKey,
    userIp,
  }: {
    captchaKey: string[] | string;
    userIp: string;
  }) {
    const captchaSecret = '6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe';

    const res = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captchaKey}&remoteip=${userIp}`,
      {
        method: 'POST',
      },
    );

    const data = await res.json();

    return data;
  }

  async validateCaptcha({ req }: { req: Ctx['req'] }) {
    const captchaKey = req.headers['x-vitnode-captcha-token'];
    if (!captchaKey) {
      throw new CustomError({
        code: 'CAPTCHA_NOT_PROVIDED',
        message: 'Captcha token not provided',
      });
    }

    const userIp = getUserIp(req);
    const res: { success: boolean; 'error-codes'?: string[]; score?: number } =
      await this.getResFromReCaptcha({
        captchaKey,
        userIp,
      });

    if (!res.success || res.score < 0.5) {
      throw new CustomError({
        code: 'CAPTCHA_INVALID',
        message: 'Captcha is invalid',
      });
    }
  }
}
