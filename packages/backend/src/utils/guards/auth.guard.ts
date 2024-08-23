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

  protected async getAuth({ req, res }: GqlContext) {
    const data = await this.service.authorization({
      req,
      res,
    });
    req.user = data;

    return data;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const optionalAuth = this.reflector.get(OptionalAuth, context.getHandler());

    const ctx: GqlContext = GqlExecutionContext.create(context).getContext();

    // If optional auth decorator is not set, check auth
    if (optionalAuth === undefined) {
      return !!(await this.getAuth(ctx));
    } else {
      try {
        return !!(await this.getAuth(ctx));
      } catch (_) {
        // Return true if auth is optional
        return true;
      }
    }
  }
}

export const OptionalAuth = Reflector.createDecorator();
