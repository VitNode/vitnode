import { Args, Query, Resolver } from "@nestjs/graphql";

import { ShowCoreNavService } from "./show.service";
import { ShowCoreNavObj } from "./dto/show.obj";
import { ShowCoreNavArgs } from "./dto/show.args";

@Resolver()
export class ShowCoreNavResolver {
  constructor(private readonly service: ShowCoreNavService) {}

  @Query(() => ShowCoreNavObj)
  async core_nav__show(@Args() args: ShowCoreNavArgs): Promise<ShowCoreNavObj> {
    return await this.service.show(args);
  }
}
