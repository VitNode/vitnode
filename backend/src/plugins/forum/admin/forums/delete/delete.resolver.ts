import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { DeleteForumForumsService } from "./delete.service";
import { DeleteForumForumsArgs } from "./dto/delete.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class DeleteForumForumsResolver {
  constructor(private readonly service: DeleteForumForumsService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__delete(
    @Args() args: DeleteForumForumsArgs
  ): Promise<string> {
    return this.service.delete(args);
  }
}
