import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowCoreSessionDevicesService } from "./show.service";
import { ShowCoreSessionDevicesObj } from "./dto/show.obj";

import { CurrentUser, User } from "../../../../decorators";
import { AuthGuards } from "../../../../utils/guards/auth.guard";

@Resolver()
export class ShowCoreSessionDevicesResolver {
  constructor(private readonly service: ShowCoreSessionDevicesService) {}

  @Query(() => [ShowCoreSessionDevicesObj])
  @UseGuards(AuthGuards)
  async core_sessions__devices__show(
    @CurrentUser() user: User | null,
  ): Promise<ShowCoreSessionDevicesObj[]> {
    return this.service.show(user);
  }
}
