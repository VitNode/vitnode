import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';

import { AuthorizationAdminSessionsObj } from '../../core/admin/sessions/authorization/authorization.dto';
import { GqlContext } from '../context';

export const AdminPermission = Reflector.createDecorator<string>();

@Injectable()
export class AdminAuthGuards implements CanActivate {
  constructor(
    @Inject('IOAdminAuthGuards')
    private readonly service: {
      authorization: (
        context: GqlContext,
      ) => Promise<AuthorizationAdminSessionsObj>;
    },
    private readonly reflector: Reflector,
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
    const authorization = await this.getAuth(ctx);
    const permission: string | undefined = this.reflector.get(
      AdminPermission,
      context.getHandler(),
    );

    if (!permission) {
      return !!authorization;
    }

    return !!authorization;
  }
}
