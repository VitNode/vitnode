import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthorizationAdminSessionsObj } from '../../core/admin/sessions/authorization/authorization.dto';
import { GqlContext } from '../context';

export interface IOAdminAuthGuards {
  authorization: (
    context: GqlContext,
  ) => Promise<AuthorizationAdminSessionsObj>;
}

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(
    @Inject('IOAdminAuthGuards') private readonly service: IOAdminAuthGuards,
  ) {}

  protected async getAuth({ req, res }: GqlContext) {
    const data = await this.service.authorization({
      req,
      res,
    });

    req.user = data.user ?? undefined;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx: GqlContext = GqlExecutionContext.create(context).getContext();

    try {
      return !!(await this.getAuth(ctx));
    } catch (_) {
      // Return true if auth is optional
      return true;
    }
  }
}
