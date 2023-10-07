import { Context, Query, Resolver } from '@nestjs/graphql';

import { AuthorizationCoreSessionsService } from './authorization-core_sessions.service';

import { Ctx } from '@/types/context.type';
import { User } from '@/utils/decorators/user.decorator';

@Resolver()
export class AuthorizationCoreSessionsResolver {
  constructor(private readonly service: AuthorizationCoreSessionsService) {}

  @Query(() => User)
  async authorization_core_sessions(@Context() context: Ctx): Promise<User> {
    return await this.service.authorization(context);
  }
}
