import { Args, Query, Resolver } from "@nestjs/graphql";

import { ShowCoreSessionDevicesService } from "./show.service";
import { ShowCoreSessionDevicesArgs } from "./dto/show.args";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

@Resolver()
export class ShowCoreSessionDevicesResolver {
  constructor(private readonly service: ShowCoreSessionDevicesService) {}

  @Query(() => ShowCoreSessionDevicesObj)
  async core_nav__show(
    @Args() args: ShowCoreSessionDevicesArgs): Promise<ShowCoreSessionDevicesObj> {
        return await this.service.show(args);
  }
}