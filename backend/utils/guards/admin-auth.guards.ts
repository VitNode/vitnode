import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { Ctx } from '@/types/context.type';
import { AuthorizationAdminSessionsService } from '@/src/admin/core/sessions/authorization/authorization.service';

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(
    private reflector: Reflector,
    private service: AuthorizationAdminSessionsService
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
    const optionalAuth = this.reflector.get(OptionalAuth, context.getHandler());

    const ctx = GqlExecutionContext.create(context).getContext();

    // If optional auth decorator is not set, check auth
    if (optionalAuth === undefined) {
      return !!(await this.getAuth(ctx));
    } else {
      try {
        return !!(await this.getAuth(ctx));
      } catch (e) {
        // Return true if auth is optional
        return true;
      }
    }
  }
}

export const OptionalAuth = Reflector.createDecorator();
