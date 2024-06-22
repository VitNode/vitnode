import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { CreateAdminNavPluginsService } from "./create.service";
import { ShowAdminNavPluginsObj } from "../show/dto/show.obj";
import { CreateAdminNavPluginsArgs } from "./dto/create.args";

import { AdminAuthGuards, OnlyForDevelopment } from "../../../../../utils";

@Resolver()
export class CreateAdminNavPluginsResolver {
  constructor(private readonly service: CreateAdminNavPluginsService) {}

  @Mutation(() => ShowAdminNavPluginsObj)
  @UseGuards(AdminAuthGuards)
  @UseGuards(OnlyForDevelopment)
  admin__core_plugins__nav__create(
    @Args() args: CreateAdminNavPluginsArgs,
  ): ShowAdminNavPluginsObj {
    return this.service.create(args);
  }
}
