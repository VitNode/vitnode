import { Context, Query, Resolver } from "@nestjs/graphql";

import { ShowSettingsService } from "./show.service";
import { ShowSettingsObj } from "./dto/show.obj";

import { Ctx } from "@/types/context.type";

@Resolver()
export class ShowCoreSettingsResolver {
  constructor(private readonly service: ShowSettingsService) {}

  @Query(() => ShowSettingsObj)
  async core_settings__show(@Context() context: Ctx): Promise<ShowSettingsObj> {
    return await this.service.show(context);
  }
}
