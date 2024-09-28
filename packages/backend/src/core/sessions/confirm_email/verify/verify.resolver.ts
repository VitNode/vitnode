import { Args, Query, Resolver } from '@nestjs/graphql';

import { VerifyConfirmEmailCoreSessionsArgs } from './verify.dto';
import { VerifyConfirmEmailCoreSessionsService } from './verify.service';

@Resolver()
export class VerifyConfirmEmailCoreSessionsResolver {
  constructor(
    private readonly service: VerifyConfirmEmailCoreSessionsService,
  ) {}

  @Query(() => String)
  async core_sessions__email_verify(
    @Args() args: VerifyConfirmEmailCoreSessionsArgs,
  ): Promise<string> {
    return this.service.verify(args);
  }
}
