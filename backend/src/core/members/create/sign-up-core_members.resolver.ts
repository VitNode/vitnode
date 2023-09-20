import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { SignUpCoreMembersObj } from './dto/sign-up-core_members.obj';
import { SignUpCoreMembersService } from './sign-up-core_members.service';
import { SignUpCoreMembersArgs } from './dto/sign-up-core_members.args';

@Resolver()
export class SignUpCoreMembersResolver {
  constructor(private readonly service: SignUpCoreMembersService) {}

  @Mutation(() => SignUpCoreMembersObj)
  async create_core_members(@Args() args: SignUpCoreMembersArgs): Promise<SignUpCoreMembersObj> {
    return this.service.signUp(args);
  }
}
