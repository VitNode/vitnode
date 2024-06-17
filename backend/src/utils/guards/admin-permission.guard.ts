import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthorizationAdminSessionsService } from "@/plugins/core/admin/sessions/authorization/authorization.service";
import { DatabaseService } from "@/database/database.service";
import { eq } from "drizzle-orm";
import { core_users } from "@/plugins/core/admin/database/schema/users";
import { Reflector } from "@nestjs/core";
import { Ctx } from "../types/context.type";

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

      const { req } = ctx.getContext();
      const userId = req.user.id;
      const user = await this.databaseService.db.query.core_users.findFirst({
        where: eq(core_users.id, userId)
      });

      if (!user) return false;

      const admin =
        await this.databaseService.db.query.core_admin_permissions.findFirst({
          where: (table, { or, eq }) =>
            or(eq(table.user_id, user.id), eq(table.group_id, user.group_id))
        });

      if (!admin || !admin.permissions) return false;
      const permissions = admin.permissions;
      if (permissions[permission] === true) return true;
      return false;
    } catch (e) {
      // Return true if auth is optional
      return true;
    }
  }
}
