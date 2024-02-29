import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { ShowAdminThemesService } from "./show.service";
import { ShowAdminThemesObj } from "./dto/show.obj";
import { ShowAdminThemesArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/src/utils/guards/admin-auth.guards";

@Resolver()
export class ShowAdminThemesResolver {
  constructor(private readonly service: ShowAdminThemesService) {}

  @Query(() => ShowAdminThemesObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_themes__show(
    @Args() args: ShowAdminThemesArgs
  ): Promise<ShowAdminThemesObj> {
    return await this.service.show(args);
  }
}
