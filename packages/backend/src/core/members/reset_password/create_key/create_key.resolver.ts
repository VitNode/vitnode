import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateKeyResetPasswordCoreMembersArgs } from './create_key.dto';
import { CreateKeyResetPasswordCoreMembersService } from './create_key.service';

@Resolver()
export class CreateKeyResetPasswordCoreMembersResolver {
  constructor(
    private readonly service: CreateKeyResetPasswordCoreMembersService,
  ) {}

  @Mutation(() => String)
  async core_members__reset_password__create_key(
    @Args() args: CreateKeyResetPasswordCoreMembersArgs,
  ): Promise<string> {
    return this.service.create_key(args);
  }
}
