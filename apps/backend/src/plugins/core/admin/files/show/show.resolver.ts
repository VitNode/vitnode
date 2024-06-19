import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";

import { ShowAdminFilesService } from "./show.service";
import { ShowAdminFilesObj } from "./dto/show.obj";
import { ShowAdminFilesArgs } from "./dto/show.args";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guard";

@Resolver()
export class ShowAdminFilesResolver {
  constructor(private readonly service: ShowAdminFilesService) {}

  @Query(() => ShowAdminFilesObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_files__show(
    @Args() args: ShowAdminFilesArgs
  ): Promise<ShowAdminFilesObj> {
    return this.service.show(args);
  }
}
