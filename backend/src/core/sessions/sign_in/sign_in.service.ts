import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';

import { SignInCoreSessionsArgs } from './dto/sign_in.args';

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

  protected async createSession({
    admin,
    email,
    name,
    remember,
    req,
    res,
    userId
  }: CreateSessionArgs) {
    const login_token = this.jwtService.sign(
      {
        name,
        email
      },
      {
        secret: CONFIG.cookies.login_token.secret,
        expiresIn: CONFIG.cookies.login_token.expiresIn
      }
    );

    const expires = remember
      ? CONFIG.cookies.login_token.expiresInRemember
      : CONFIG.cookies.login_token.expiresIn;

    const data: Prisma.core_sessionsCreateInput = {
      login_token: login_token,
      member: {
        connect: {
          id: userId
        }
      },
      last_seen: currentDate(),
      expires: currentDate() + expires,
      created: currentDate()
    };

    // if (admin) {
    //   await this.prisma.core_admin_sessions.create({
    //     data: {
    //       ...data,
    //       expires: currentDate() + CONFIG.cookies.login_token.admin.expiresIn
    //     }
    //   });

    //   return login_token;
    // }

    await this.prisma.core_sessions.create({
      data
    });

    // Set cookie for session
    res.cookie(CONFIG.cookies.login_token.name, login_token, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/',
      expires: new Date(convertUnixTime(currentDate() + CONFIG.cookies.login_token.expiresIn)),
      sameSite: 'none'
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
    if (!user) throw new AccessDeniedError();

    const validPassword = await compare(password, user.password);
    if (!validPassword) throw new AccessDeniedError();

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
      if (!accessToAdminCP) throw new AccessDeniedError();
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
