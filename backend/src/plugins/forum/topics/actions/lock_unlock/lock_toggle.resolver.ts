import { UseGuards } from "@nestjs/common";
import { Args, Context, Mutation, Resolver } from "@nestjs/graphql";

import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { AuthGuards } from "@/utils/guards/auth.guard";
import { LockToggleForumTopicsService } from "@/plugins/forum/topics/actions/lock_unlock/lock_toggle.service";
import { LockToggleForumTopicsArgs } from "@/plugins/forum/topics/actions/lock_unlock/dto/lock_toggle.args";
import { Ctx } from "@/utils/types/context.type";

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
