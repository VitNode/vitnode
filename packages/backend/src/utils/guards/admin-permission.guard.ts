import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { GqlContext } from '../context';
import { IOAdminAuthGuards } from './admin-auth.guard';

// TODO: Implement in DOCS
// ? Example use
// @UseGuards(AdminPermissionGuards)
// @SetMetadata("permission", "create_group")

@Injectable()
export class AdminPermissionGuards implements CanActivate {
  // TODO: Add inject for service // Basic service is not compatible with this package
  constructor(
    private readonly reflector: Reflector,
    @Inject('IOAdminAuthGuards') private readonly service: IOAdminAuthGuards,
    // private readonly databaseService: InternalDatabaseService
  ) {}

  protected async getAuth({ reply, request }: GqlContext) {
    const data = await this.service.authorization({
      reply,
      request,
    });
    request.user = data.user ?? undefined;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx: GqlContext = gqlCtx.getContext();

    try {
      // const permission = this.reflector.get<string>(
      //   "permission",
      //   context.getHandler()
      // );

      // const userId = ctx.getContext().user.id;
      // const user = await this.databaseService.db.query.core_users.findFirst({
      //   where: (table, { eq }) => eq(table.id, userId)
      // });

      // if (!user) return false;

      // const admin =
      //   await this.databaseService.db.query.core_admin_permissions.findFirst({
      //     where: (table, { or, eq }) =>
      //       or(eq(table.user_id, user.id), eq(table.group_id, user.group_id))
      //   });

      // if (!admin?.permissions) return false;
      // const permissions = admin.permissions;
      // if (permissions[permission] === true) return true;

      return false;
    } catch (e) {
      // Return true if auth is optional
      return true;
    }
  }
}
