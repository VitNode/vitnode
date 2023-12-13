import { Args, Query, Resolver } from '@nestjs/graphql';

import { ShowTopicsForumsService } from './show.service';
import { ShowTopicsForumsArgs } from './dto/show.args';
import { ShowTopicsForumsObj } from './dto/show.obj';

@Resolver()
export class ShowTopicsForumsResolver {
  constructor(private readonly service: ShowTopicsForumsService) {}

  @Query(() => ShowTopicsForumsObj)
  async forum_topics__show(@Args() args: ShowTopicsForumsArgs): Promise<ShowTopicsForumsObj> {
    return await this.service.show(args);
  }
}
