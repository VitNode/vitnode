import { Args, Query, Resolver } from '@nestjs/graphql';
import { ShowAdminThemesService } from './show.service';
import { UseGuards } from '@nestjs/common';
import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';
import { ShowAdminThemesObj } from './dto/show.obj';
import { ShowAdminThemesArgs } from './dto/show.args';

@Resolver()
export class ShowAdminThemesResolver {
  constructor(private readonly service: ShowAdminThemesService) {}

  @Query(() => ShowAdminThemesObj)
  @UseGuards(AdminAuthGuards)
  async core_themes__admin__show(@Args() args: ShowAdminThemesArgs): Promise<ShowAdminThemesObj> {
    return await this.service.show(args);
  }
}
