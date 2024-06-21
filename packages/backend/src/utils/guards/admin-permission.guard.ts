import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { eq } from "drizzle-orm";

import { Ctx } from "../context";

import { DatabaseService } from "../../database";
import { AuthorizationAdminSessionsService } from "../../core/admin/sessions/authorization/authorization.service";

@Injectable()
export class AdminPermissionGuards implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly service: AuthorizationAdminSessionsService,
    private readonly databaseService: DatabaseService
  ) {}

  protected async getAuth({ req, res }: Ctx) {
    const data = await this.service.authorization({
      req,
      res
    });
    req.user = data.user;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context).getContext();

    try {
      const permission = this.reflector.get<string>(
        "permission",
        context.getHandler()
      );

      const userId = ctx.getContext().user.id;
      const user = await this.databaseService.db.query.core_users.findFirst({
        where: (table, { eq }) => eq(table.id, userId)
      });

      if (!user) return false;

      const admin =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { or, eq }) =>
            or(eq(table.user_id, user.id), eq(table.group_id, user.group_id))
        });

      if (!admin?.permissions) return false;
      const permissions = admin.permissions;
      if (permissions[permission] === true) return true;

      return false;
    } catch (e) {
      // Return true if auth is optional
      return true;
    }
  }
}
