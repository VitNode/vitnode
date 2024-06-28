import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ResetPasswordCoreMembersArgs } from './dto/reset_password.args';
import { ResetPasswordCoreMembersService } from './reset_password.service';

@Resolver()
export class ResetPasswordCoreMembersResolver {
  constructor(private readonly service: ResetPasswordCoreMembersService) {}

  @Mutation(() => String)
  async core_members__reset_password(
    @Args() args: ResetPasswordCoreMembersArgs,
  ): Promise<string> {
    return this.service.reset_password(args);
  }
}
