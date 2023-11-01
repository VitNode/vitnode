import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UAParser } from 'ua-parser-js';
import { Response } from 'express';

import { AuthorizationAdminSessionsObj } from './dto/authorization-admin_sessions.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';
import { CONFIG } from '@/config';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { convertUnixTime, currentDate } from '@/functions/date';
import * as config from '@/config.json';

@Injectable()
export class AuthorizationAdminSessionsService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  private clearCookies({ cookie, res }: { cookie: string; res: Response }) {
    res.clearCookie(cookie, {
      httpOnly: true,
      secure: true,
      domain: CONFIG.cookie.domain,
      path: '/admin'
    });
  }

  async authorization({ req, res }: Ctx): Promise<AuthorizationAdminSessionsObj> {
    const others = {
      side_name: config.side_name
    };

    const tokens = {
      accessToken: req.cookies[CONFIG.access_token.admin.name],
      refreshToken: req.cookies[CONFIG.refresh_token.admin.name]
    };

    // If access token exists, check it
    if (tokens.accessToken) {
      const session = await this.prisma.core_admin_sessions.findUnique({
        where: {
          access_token: tokens.accessToken
        }
      });

      if (!session || session.access_token !== tokens.accessToken) {
        this.clearCookies({ res, cookie: tokens.accessToken });
        throw new AccessDeniedError();
      }

      const decodeAccessToken = this.jwtService.decode(tokens.accessToken);
      // If access token is invalid or expired, clear cookies
      if (decodeAccessToken && decodeAccessToken['exp'] > currentDate()) {
        const user = await this.prisma.core_members.findUnique({
          where: {
            id: session.member_id
          }
        });

        if (!user) {
          throw new AccessDeniedError();
        }

        const avatar = await this.prisma.core_attachments.findFirst({
          where: {
            module: 'core_members',
            module_id: user.id
          }
        });

        return {
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            name_seo: user.name_seo,
            birthday: user.birthday,
            is_admin: true,
            newsletter: user.newsletter,
            group_id: user.group_id,
            avatar: { img: avatar, color: user.avatar_color }
          },
          ...others
        };
      }
    }

    // You don't have access token, but you have refresh token
    if (tokens.refreshToken) {
      const session = await this.prisma.core_admin_sessions.findUnique({
        where: {
          refresh_token: tokens.refreshToken
        }
      });

      if (!session || session.refresh_token !== tokens.refreshToken) {
        this.clearCookies({ res, cookie: tokens.refreshToken });
        this.clearCookies({ res, cookie: tokens.accessToken });
        res.clearCookie(CONFIG.access_token.admin.name);
        res.clearCookie(CONFIG.refresh_token.admin.name);
        throw new AccessDeniedError();
      }

      const decodeRefreshToken = this.jwtService.decode(tokens.refreshToken);
      // If refresh token is invalid or expired, clear cookies
      if (!decodeRefreshToken || decodeRefreshToken['exp'] < currentDate()) {
        this.clearCookies({ res, cookie: tokens.refreshToken });
        this.clearCookies({ res, cookie: tokens.accessToken });

        throw new AccessDeniedError();
      }

      const user = await this.prisma.core_members.findUnique({
        where: {
          id: session.member_id
        }
      });

      if (!user) {
        throw new AccessDeniedError();
      }

      // Check if user has access to admin cp
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

      // Create new access token
      const currentAccessToken = this.jwtService.sign(
        {
          name: user.name,
          email: user.email
        },
        {
          secret: CONFIG.access_token.secret,
          expiresIn: 60 * 5 // 5 min
        }
      );

      // Update session
      const uaParser = new UAParser(req.headers['user-agent']);
      const uaParserResults = uaParser.getResult();
      await this.prisma.core_admin_sessions.update({
        where: { refresh_token: session.refresh_token },
        data: {
          access_token: currentAccessToken,
          last_seen: currentDate(),
          ip_address: req.ip,
          member_id: user.id,
          user_agent: req.headers['user-agent'],
          uagent_browser: uaParserResults.browser.name,
          uagent_version: uaParserResults.browser.version,
          uagent_os: `${uaParserResults.os.name} ${uaParserResults.os.version}`,
          uagent_device_vendor: uaParserResults.device.vendor,
          uagent_device_model: uaParserResults.device.model,
          uagent_device_type: uaParserResults.device.type
        }
      });

      // Create cookie
      res.cookie(CONFIG.access_token.admin.name, currentAccessToken, {
        httpOnly: true,
        secure: true,
        domain: CONFIG.cookie.domain,
        path: '/admin',
        expires: new Date(convertUnixTime(currentDate() + CONFIG.access_token.admin.expiresIn)),
        sameSite: 'none'
      });

      const avatar = await this.prisma.core_attachments.findFirst({
        where: {
          module: 'core_members',
          module_id: user.id
        }
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          name_seo: user.name_seo,
          birthday: user.birthday,
          is_admin: true,
          newsletter: user.newsletter,
          group_id: user.group_id,
          avatar: { img: avatar, color: user.avatar_color }
        },
        ...others
      };
    }

    // Still here? Throw error
    this.clearCookies({ res, cookie: tokens.refreshToken });
    this.clearCookies({ res, cookie: tokens.accessToken });
    throw new AccessDeniedError();
  }
}
