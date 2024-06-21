import { UseGuards } from "@nestjs/common";
import { Args, Query, Resolver } from "@nestjs/graphql";
import { AdminAuthGuards } from "vitnode-backend";

import { ShowAdminFilesService } from "./show.service";
import { ShowAdminFilesObj } from "./dto/show.obj";
import { ShowAdminFilesArgs } from "./dto/show.args";

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
