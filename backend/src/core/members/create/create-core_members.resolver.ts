import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CreateCoreMembersObj } from './dto/create-core_members.obj';
import { CreateCoreMembersService } from './create-core_members.service';
import { CreateCoreMembersArgs } from './dto/create-core_members.args';

@Resolver()
export class CreateCoreMembersResolver {
  constructor(private readonly createCoreMembersService: CreateCoreMembersService) {}

  @Mutation(() => CreateCoreMembersObj)
  async create_core_members(@Args() args: CreateCoreMembersArgs): Promise<CreateCoreMembersObj> {
    return this.createCoreMembersService.create(args);
  }
}
