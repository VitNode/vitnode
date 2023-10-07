import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthorizationCoreSessionsService } from '@/src/core/sessions/authorization/authorization-core_sessions.service';

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(private service: AuthorizationCoreSessionsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const res = ctx.getContext().res;
    const data = await this.service.authorization({
      req,
      res
    });
    req.user = data;

    return !!data;
  }
}
