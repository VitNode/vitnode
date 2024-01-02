import { Injectable } from '@nestjs/common';

import { InternalAuthorizationCoreSessionsService } from './internal/internal_authorization.service';
import { AuthorizationCoreSessionsObj } from './dto/authorization.obj';

import { PrismaService } from '@/prisma/prisma.service';
import { Ctx } from '@/types/context.type';

@Injectable()
export class AuthorizationCoreSessionsService {
  constructor(
    private prisma: PrismaService,
    private readonly service: InternalAuthorizationCoreSessionsService
  ) {}

  protected async isAdmin({ group_id, id }: { group_id: string; id: string }): Promise<boolean> {
    return !!(await this.prisma.core_admin_permissions.findFirst({
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
    }));
  }

  protected async isMod({ group_id, id }: { group_id: string; id: string }): Promise<boolean> {
    return !!(await this.prisma.core_moderator_permissions.findFirst({
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
    }));
  }

  async authorization({ req, res }: Ctx): Promise<AuthorizationCoreSessionsObj> {
    try {
      const currentUser = await this.service.authorization({ req, res });

      const user = await this.prisma.core_members.findUnique({
        where: {
          id: currentUser.id
        },
        include: {
          avatar: true,
          group: {
            include: {
              name: true
            }
          }
        }
      });

      return {
        user: {
          ...user,
          is_admin: await this.isAdmin({ group_id: user.group.id, id: user.id }),
          is_mod: await this.isMod({ group_id: user.group.id, id: user.id }),
          avatar_color: user.avatar_color
        }
      };
    } catch (error) {
      return {
        user: null
      };
    }
  }
}
