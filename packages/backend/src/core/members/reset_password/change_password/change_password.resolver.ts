import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePasswordCoreMembersArgs } from './dto/change_password.args';
import { ChangePasswordCoreMembersService } from './change_password.service';

import { User } from '@/decorators/user.decorator';

@Resolver()
export class ChangePasswordCoreMembersResolver {
  constructor(private readonly service: ChangePasswordCoreMembersService) {}

  @Mutation(() => User)
  async core_members__change_password(
    @Args() args: ChangePasswordCoreMembersArgs,
  ): Promise<User> {
    return this.service.change_password(args);
  }
}
