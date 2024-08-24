import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePasswordCoreMembersService } from './change_password.service';
import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';

@Resolver()
export class ChangePasswordCoreMembersResolver {
  constructor(private readonly service: ChangePasswordCoreMembersService) {}

  @Mutation(() => String)
  async core_members__change_password(
    @Args() args: ChangePasswordCoreMembersArgs,
  ): Promise<string> {
    return this.service.change_password(args);
  }
}
