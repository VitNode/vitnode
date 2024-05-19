import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { Ctx } from "../types/context.type";
import { AuthorizationAdminSessionsService } from "@/plugins/core/admin/sessions/authorization/authorization.service";

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(private readonly service: AuthorizationAdminSessionsService) {}

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
      return !!(await this.getAuth(ctx));
    } catch (_e) {
      // Return true if auth is optional
      return true;
    }
  }
}
