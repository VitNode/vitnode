import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowCoreSessionDevicesService } from "./show.service";
import { ShowCoreSessionDevicesArgs } from "./dto/show.args";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import { CurrentUser, User } from "@/utils/decorators/user.decorator";
import { AuthGuards } from "@/utils/guards/auth.guard";

@Resolver()
export class ShowCoreSessionDevicesResolver {
  constructor(private readonly service: ShowCoreSessionDevicesService) {}

  @Query(() => ShowCoreSessionDevicesObj)
  @UseGuards(AuthGuards)
  async core_sessions_devices__show(
    @Args() args: ShowCoreSessionDevicesArgs,
    @CurrentUser() user: User | null
  ): Promise<ShowCoreSessionDevicesObj> {
    return await this.service.show(args, user);
  }
}
