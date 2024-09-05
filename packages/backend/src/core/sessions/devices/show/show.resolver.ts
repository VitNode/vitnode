import { CurrentUser, User } from '@/decorators';
import { AuthGuards } from '@/utils/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';

import { ShowCoreSessionDevicesObj } from './show.dto';
import { ShowCoreSessionDevicesService } from './show.service';

@Resolver()
export class ShowCoreSessionDevicesResolver {
  constructor(private readonly service: ShowCoreSessionDevicesService) {}

  @Query(() => [ShowCoreSessionDevicesObj])
  @UseGuards(AuthGuards)
  async core_sessions__devices__show(
    @CurrentUser() user: User,
  ): Promise<ShowCoreSessionDevicesObj[]> {
    return this.service.show(user);
  }
}
