import { Args, Query, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { ShowCoreThemesService } from './show.service';
import { ShowCoreThemesObj } from './dto/show.obj';
import { ShowCoreThemesArgs } from './dto/show.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class ShowAdminThemesResolver {
  constructor(private readonly service: ShowCoreThemesService) {}

  @Query(() => ShowCoreThemesObj)
  @UseGuards(AdminAuthGuards)
  async core_themes__show(@Args() args: ShowCoreThemesArgs): Promise<ShowCoreThemesObj> {
    return await this.service.show(args);
  }
}
