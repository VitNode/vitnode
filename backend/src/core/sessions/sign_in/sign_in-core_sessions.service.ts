import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UAParser } from 'ua-parser-js';
import { JwtService } from '@nestjs/jwt';

import { SignInCoreSessionsArgs } from './dto/sign_in-core_sessions.args';

import { PrismaService } from '@/prisma/prisma.service';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { convertUnixTime, currentDate } from '@/functions/date';

interface CreateSessionArgs extends Ctx {
  email: string;
  name: string;
  userId: string;
  admin?: boolean;
  remember?: boolean;
}

@Injectable()
export class SignInCoreSessionsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private async createSession({
    admin,
    email,
    name,
    remember,
    req,
    res,
    userId
  }: CreateSessionArgs) {
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

    const data = {
      refresh_token: refreshToken,
      member_id: userId,
      user_agent: req.headers['user-agent'],
      last_seen: currentDate(),
      expires: currentDate() + 60 * 60 * 24 * (admin ? 1 : 365), // 1 day for admin, 365 days for user
      uagent_browser: uaParserResults.browser.name ?? 'Uagent from tests',
      uagent_version: uaParserResults.browser.version ?? 'Uagent from tests',
      uagent_os: uaParserResults.os.name
        ? `${uaParserResults.os.name} ${uaParserResults.os.version}`
        : 'Uagent from tests',
      uagent_device_vendor: uaParserResults.device.vendor ?? 'Uagent from tests',
      uagent_device_model: uaParserResults.device.model ?? 'Uagent from tests',
      uagent_device_type: uaParserResults.device.type ?? 'Uagent from tests'
    };

    if (admin) {
      await this.prisma.core_admin_sessions.create({
        data
      });
    } else {
      await this.prisma.core_sessions.create({
        data
      });
    }

    const cookiesName = {
      refreshToken: admin ? CONFIG.refresh_token.admin.name : CONFIG.refresh_token.name,
      accessToken: admin ? CONFIG.access_token.admin.name : CONFIG.access_token.name
    };

    // Create cookie for refresh token
    res.cookie(cookiesName.refreshToken, refreshToken, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires:
        remember && !admin
          ? new Date(convertUnixTime(currentDate() + CONFIG.refresh_token.expiresIn))
          : undefined,
      sameSite: 'none'
    });

    // Reset access token cookie
    res.clearCookie(cookiesName.accessToken, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      sameSite: 'none'
    });
  }

  async signIn({ admin, email, password, remember }: SignInCoreSessionsArgs, ctx: Ctx) {
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

    // If admin mode is enabled, check if user has access to admin cp
    if (admin) {
      const accessToAdminCP = await this.prisma.core_admin_access.findFirst({
        where: {
          OR: [
            {
              member_id: user.id
            },
            {
              group_id: user.group_id
            }
          ]
        }
      });

      if (!accessToAdminCP) {
        throw new AccessDeniedError();
      }
    }

    await this.createSession({
      name: user.name,
      email: user.email,
      userId: user.id,
      admin,
      ...ctx,
      remember
    });

    return 'Success!';
  }
}
