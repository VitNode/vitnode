import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AdminAuthGuards } from '../../../utils';
import { DeleteCoreMembersService } from './delete.service';
import { DeleteCoreMembersArgs } from './dto/delete.args';

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
