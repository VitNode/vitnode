import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminNavService } from "./create.service";
import { CreateAdminNavArgs } from "./dto/create.args";

import { ShowCoreNav } from "../../../nav/show/dto/show.obj";
import { AdminAuthGuards } from "../../../../utils";

@Resolver()
export class CreateAdminNavResolver {
  constructor(private readonly service: CreateAdminNavService) {}

  @Mutation(() => ShowCoreNav)
  @UseGuards(AdminAuthGuards)
  async admin__core_nav__create(
    @Args() args: CreateAdminNavArgs
  ): Promise<ShowCoreNav> {
    return this.service.create(args);
  }
}
