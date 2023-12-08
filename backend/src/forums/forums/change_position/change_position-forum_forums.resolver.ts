import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePositionForumForumsService } from './change_position-forum_forums.service';
import { ChangePositionForumForumsArgs } from './dto/change_position-forum_forums.args';

@Resolver()
export class ChangePositionForumCategoriesResolver {
  constructor(private readonly service: ChangePositionForumForumsService) {}

  @Mutation(() => String)
  async changePosition_forum_forums(@Args() args: ChangePositionForumForumsArgs): Promise<string> {
    return await this.service.changeOrderingForumForums(args);
  }
}
