import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ChangePositionForumForumsService } from './change_position.service';
import { ChangePositionForumForumsArgs } from './dto/change_position.args';

@Resolver()
export class ChangePositionForumForumsResolver {
  constructor(private readonly service: ChangePositionForumForumsService) {}

  @Mutation(() => String)
  async forum_forums__admin__change_position(
    @Args() args: ChangePositionForumForumsArgs
  ): Promise<string> {
    return await this.service.changeOrderingForumForums(args);
  }
}
