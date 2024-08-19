import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { GqlContext } from '../context';

import { User } from '../../decorators';

interface IOAuthGuards {
  authorization: (context: GqlContext) => Promise<User>;
}

@Injectable()
export class AuthGuards implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject('IOAuthGuards') private readonly service: IOAuthGuards,
  ) {}

  protected async getAuth({ request, reply }: GqlContext) {
    const data = await this.service.authorization({
      request,
      reply,
    });
    request.user = data;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const optionalAuth = this.reflector.get(OptionalAuth, context.getHandler());
    const gqlCtx = GqlExecutionContext.create(context);
    const ctx: GqlContext = gqlCtx.getContext();

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
