import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminAuthGuards } from '../../../utils';
import { DeleteCoreMembersArgs } from './delete.dto';
import { DeleteCoreMembersService } from './delete.service';

@Resolver()
export class DeleteCoreMembersResolver {
  constructor(private readonly service: DeleteCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_members__delete(
    @Args() args: DeleteCoreMembersArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
