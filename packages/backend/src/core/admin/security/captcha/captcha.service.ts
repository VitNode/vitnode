import * as fs from 'fs';

import { Injectable } from '@nestjs/common';

import {
  CaptchaSecurityConfig,
  HelpersAdminCaptchaSecurityService,
} from './helpers.service';

import { Ctx } from '../../../../utils';
import { CustomError } from '../../../../errors';
import { getUserIp } from '../../../../functions';
import { CaptchaTypeEnum, getConfigFile } from '@/providers';

@Injectable()
export class CaptchaCoreCaptchaSecurityService extends HelpersAdminCaptchaSecurityService {
  private async getResFromReCaptcha({
    captchaKey,
    userIp,
  }: {
    captchaKey: string[] | string;
    userIp: string;
  }): Promise<{ success: boolean; 'error-codes'?: string[]; score?: number }> {
    const {
      security: { captcha: config },
    } = getConfigFile();
    // If captcha is disabled, return success
    if (config.type === CaptchaTypeEnum.none || !config.type) {
      return {
        success: true,
      };
    }

    // Get secret key from file
    if (!fs.existsSync(this.path)) {
      return {
        success: false,
      };
    }
    const captchaSecurityConfig: CaptchaSecurityConfig = JSON.parse(
      fs.readFileSync(this.path, 'utf8'),
    );

    if (config.type === CaptchaTypeEnum.cloudflare_turnstile) {
      const res = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
          method: 'POST',
          body: JSON.stringify({
            secret: captchaSecurityConfig.secret_key,
            response: captchaKey,
            remoteip: userIp,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const data = await res.json();

      return data;
    } else if (
      config.type === CaptchaTypeEnum.recaptcha_v2_checkbox ||
      config.type === CaptchaTypeEnum.recaptcha_v2_invisible ||
      config.type === CaptchaTypeEnum.recaptcha_v3
    ) {
      const res = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecurityConfig.secret_key}&response=${captchaKey}&remoteip=${userIp}`,
        {
          method: 'POST',
        },
      );

      const data = await res.json();

      return data;
    }

    return {
      success: false,
    };
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
    const res = await this.getResFromReCaptcha({
      captchaKey,
      userIp,
    });

    if (!res.success || res.score < 0.5) {
      throw new CustomError({
        code: 'CAPTCHA_FAILED',
        message: 'Verification of captcha failed',
      });
    }
  }
}
