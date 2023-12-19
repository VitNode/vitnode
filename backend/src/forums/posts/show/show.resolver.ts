import { Query, Resolver } from '@nestjs/graphql';

import { ShowPostsForumsService } from './show.service';

@Resolver()
export class ShowPostsForumsResolver {
  constructor(private readonly service: ShowPostsForumsService) {}

  @Query(() => String)
  async forum_posts__show(): Promise<string> {
    return await this.service.show();
  }
}
