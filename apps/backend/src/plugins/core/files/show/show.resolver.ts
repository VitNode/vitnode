import { Args, Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";
import { CurrentUser, User, AuthGuards } from "vitnode-backend";

import { ShowCoreFilesService } from "./show.service";
import { ShowCoreFilesObj } from "./dto/show.obj";
import { ShowCoreFilesArgs } from "./dto/show.args";

@Resolver()
export class ShowCoreFilesResolver {
  constructor(private readonly service: ShowCoreFilesService) {}

  @Query(() => ShowCoreFilesObj)
  @UseGuards(AuthGuards)
  async core_files__show(
    @CurrentUser() currentUser: User,
    @Args() args: ShowCoreFilesArgs
  ): Promise<ShowCoreFilesObj> {
    return this.service.show(currentUser, args);
  }
}
