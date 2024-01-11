import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { Ctx } from '@/types/context.type';
import { AccessDeniedError } from '@/utils/errors/AccessDeniedError';
import { currentDate } from '@/functions/date';
import { DatabaseService } from '@/database/database.service';
import { User } from '@/utils/decorators/user.decorator';

@Injectable()
export class InternalAuthorizationCoreSessionsService {
  constructor(
    private databaseService: DatabaseService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async authorization({ req }: Ctx): Promise<User> {
    const login_token = req.cookies[this.configService.getOrThrow('cookies.login_token.name')];

    if (!login_token) {
      throw new AccessDeniedError();
    }

    const session = await this.databaseService.db.query.core_sessions.findFirst({
      where: (table, { eq }) => eq(table.login_token, login_token),
      with: {
        user: {
          with: {
            avatar: true,
            group: {
              with: {
                name: true
              }
            }
          }
        }
      }
    });

    if (!session) {
      throw new AccessDeniedError();
    }

    const decodeAccessToken = this.jwtService.decode(login_token);
    if (!decodeAccessToken || decodeAccessToken['exp'] < currentDate()) {
      throw new AccessDeniedError();
    }

    return session.user;
  }
}
