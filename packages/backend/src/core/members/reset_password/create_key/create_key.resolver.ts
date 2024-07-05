import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateKeyResetPasswordCoreMembersService } from './create_key.service';
import { CreateKeyResetPasswordCoreMembersArgs } from './dto/create_key.args';

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
