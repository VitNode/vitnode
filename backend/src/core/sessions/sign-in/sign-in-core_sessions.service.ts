import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UAParser } from 'ua-parser-js';
import { JwtService } from '@nestjs/jwt';

import { SignInCoreSessionsArgs } from './dto/sign-in-core_sessions.args';

import { PrismaService } from '@/src/prisma/prisma.service';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { convertUnixTime, getCurrentDate } from '@/functions/date';

interface CreateSessionArgs extends Ctx {
  email: string;
  memberId: string;
  name: string;
  remember?: boolean;
}

@Injectable()
export class SignInCoreSessionsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private async createSession({ email, memberId, name, remember, req, res }: CreateSessionArgs) {
    const uaParser = new UAParser(req.headers['user-agent']);
    const uaParserResults = uaParser.getResult();

    const refreshToken = this.jwtService.sign(
      {
        name,
        email
      },
      {
        secret: CONFIG.refresh_token.secret,
        expiresIn: CONFIG.refresh_token.expiresIn
      }
    );

    await this.prisma.core_sessions.create({
      data: {
        refresh_token: refreshToken,
        member_id: memberId,
        user_agent: req.headers['user-agent'],
        last_seen: getCurrentDate(),
        expires: getCurrentDate() + 60 * 60 * 24 * 365, // 365 days
        uagent_browser: uaParserResults.browser.name ?? 'Uagent from tests',
        uagent_version: uaParserResults.browser.version ?? 'Uagent from tests',
        uagent_os: uaParserResults.os.name
          ? `${uaParserResults.os.name} ${uaParserResults.os.version}`
          : 'Uagent from tests',
        uagent_device_vendor: uaParserResults.device.vendor ?? 'Uagent from tests',
        uagent_device_model: uaParserResults.device.model ?? 'Uagent from tests',
        uagent_device_type: uaParserResults.device.type ?? 'Uagent from tests'
      }
    });

    // Create cookie for refresh token
    res.cookie(CONFIG.refresh_token.name, refreshToken, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires: remember
        ? new Date(convertUnixTime(getCurrentDate() + 60 * 60 * 24 * 365)) // 365 days
        : undefined,
      sameSite: 'none'
    });

    // Reset access token cookie
    res.cookie(CONFIG.access_token.name, '', {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires: new Date(convertUnixTime(getCurrentDate())),
      sameSite: 'none'
    });
  }

  async signIn({ email, password, remember }: SignInCoreSessionsArgs, ctx: Ctx) {
    const user = await this.prisma.core_members.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new AccessDeniedError();
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      throw new AccessDeniedError();
    }

    await this.createSession({
      name: user.name,
      email: user.email,
      memberId: user.id,
      ...ctx,
      remember
    });

    return 'Success!';
  }
}
