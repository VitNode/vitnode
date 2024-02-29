import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { Ctx } from "@/types/context.type";
import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { AuthGuards } from "@/utils/guards/auth.guards";
import { LockToggleForumTopicsService } from "@/modules/forum/topics/actions/lock_unlock/lock_toggle.service";
import { LockToggleForumTopicsArgs } from "@/modules/forum/topics/actions/lock_unlock/dto/lock_toggle.args";

@Resolver()
export class LockToggleForumTopicsResolver {
  constructor(private readonly service: LockToggleForumTopicsService) {}

  @Mutation(() => Boolean)
  @UseGuards(AuthGuards)
  async forum_topics__actions__lock_toggle(
    @CurrentUser() user: User,
    @Args() args: LockToggleForumTopicsArgs,
    @Context() context: Ctx
  ): Promise<boolean> {
    return await this.service.lockToggle(user, args, context);
  }
}
