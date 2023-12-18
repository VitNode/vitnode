import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { UAParser } from 'ua-parser-js';
import { JwtService } from '@nestjs/jwt';

import { SignInCoreSessionsArgs } from './dto/sign_in.args';

import { PrismaService } from '@/prisma/prisma.service';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { currentDate } from '@/functions/date';

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

  private async createSession({ admin, email, name, remember, req, userId }: CreateSessionArgs) {
    const uaParser = new UAParser(req.headers['user-agent']);
    const uaParserResults = uaParser.getResult();

    const login_token = this.jwtService.sign(
      {
        name,
        email
      },
      {
        secret: CONFIG.login_token.secret,
        expiresIn: CONFIG.login_token.expiresIn
      }
    );

    const expires = remember ? CONFIG.login_token.expiresInRemember : CONFIG.login_token.expiresIn;

    const data = {
      login_token: login_token,
      member_id: userId,
      user_agent: req.headers['user-agent'],
      last_seen: currentDate(),
      expires: currentDate() + expires,
      created: currentDate(),
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
        data: {
          ...data,
          expires: currentDate() + CONFIG.login_token.admin.expiresIn
        }
      });

      return login_token;
    }

    await this.prisma.core_sessions.create({
      data
    });

    return login_token;
  }

  async signIn({ admin, email: emailRaw, password, remember }: SignInCoreSessionsArgs, ctx: Ctx) {
    const email = emailRaw.toLowerCase();
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
      const accessToAdminCP = await this.prisma.core_admin_permissions.findFirst({
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

    return await this.createSession({
      name: user.name,
      email: user.email,
      userId: user.id,
      admin,
      ...ctx,
      remember
    });
  }
}
