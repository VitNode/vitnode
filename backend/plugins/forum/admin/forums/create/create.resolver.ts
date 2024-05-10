import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateForumForumsService } from "./create.service";
import { CreateForumForumsArgs } from "./dto/create.args";
import { CreateForumForumsObj } from "./dto/create.obj";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class CreateForumForumsResolver {
  constructor(private readonly service: CreateForumForumsService) {}

  @Mutation(() => CreateForumForumsObj)
  @UseGuards(AdminAuthGuards)
  async admin__forum_forums__create(
    @Args() args: CreateForumForumsArgs
  ): Promise<CreateForumForumsObj> {
    return await this.service.create(args);
  }
}
