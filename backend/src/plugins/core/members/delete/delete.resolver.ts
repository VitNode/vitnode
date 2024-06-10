import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteCoreMembersService } from "./delete.service";
import { DeleteCoreMembersArgs } from "./dto/delete.args";

import { AuthGuards } from "@/utils/guards/auth.guard";

@Resolver()
export class DeleteCoreMembersResolver {
  constructor(private readonly service: DeleteCoreMembersService) {}

  @Mutation(() => String)
  @UseGuards(AuthGuards)
  async core_members__delete(
    @Args() args: DeleteCoreMembersArgs
  ): Promise<string> {
    return this.service.delete(args);
  }
}
