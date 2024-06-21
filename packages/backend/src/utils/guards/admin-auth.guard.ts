import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable
} from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";

import { Ctx } from "../context";

import { AuthorizationAdminSessionsObj } from "../../core/admin/sessions/authorization/dto/authorization.obj";

export interface IOAdminAuthGuards {
  authorization: (context: Ctx) => Promise<AuthorizationAdminSessionsObj>;
}

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(
    @Inject("IOAdminAuthGuards") private readonly service: IOAdminAuthGuards
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
      return !!(await this.getAuth(ctx));
    } catch (e) {
      // Return true if auth is optional
      return true;
    }
  }
}
