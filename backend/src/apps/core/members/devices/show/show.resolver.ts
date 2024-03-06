import { Args, Query, Resolver } from "@nestjs/graphql";

import { ShowCoreSessionService } from "./show.service";
import { ShowCoreSessionArgs } from "./dto/show.args";
import { ShowCoreSessionObj } from "./dto/show.obj";

@Resolver()
export class ShowCoreSessionResolver {
  constructor(private readonly service: ShowCoreSessionService) {}

  @Query(() => ShowCoreSessionObj)
  async core_nav__show(
    @Args() args: ShowCoreSessionArgs): Promise<ShowCoreSessionObj> {
        return await this.service.show(args);
  }
}