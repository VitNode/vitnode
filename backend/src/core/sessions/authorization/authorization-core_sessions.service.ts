import { Injectable } from '@nestjs/common';

import { InternalAuthorizationCoreSessionsService } from './internal/internal_authorization-core_sessions.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization-core_sessions.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private prisma: PrismaService,
    private readonly service: InternalAuthorizationCoreSessionsService
  ) {}

  protected async isAdmin({ group_id, id }: { group_id: number; id: string }): Promise<boolean> {
    return await this.prisma.core_admin_access
      .findFirst({
        where: {
          OR: [
            {
              group_id
            },
            {
              member_id: id
            }
          ]
        }
      })
      .then(result => {
        return !!result;
      });
  }

  async authorization({ req, res }: Ctx): Promise<AuthorizationCoreSessionsObj> {
    try {
      const currentUser = await this.service.authorization({ req, res });

      const avatar = await this.prisma.core_attachments.findFirst({
        where: {
          module: 'core_members',
          module_id: currentUser.id
        }
      });

      return {
        user: {
          ...currentUser,
          is_admin: await this.isAdmin(currentUser),
          avatar: { img: avatar, color: currentUser.avatar_color }
        }
      };
    } catch (error) {
      return {
        user: null
      };
    }
  }
}
