import { Query, Resolver } from "@nestjs/graphql";
import { UseGuards } from "@nestjs/common";

import { GeneralAdminSettingsObj } from "../dto/general.obj";
import { ShowGeneralAdminSettingsObj } from "./dto/show.obj";
import { ShowGeneralAdminSettingsService } from "./show.service";

import { AdminAuthGuards } from "@/utils/guards/admin-auth.guards";

@Resolver()
export class ShowGeneralAdminSettingsResolver {
  constructor(private readonly service: ShowGeneralAdminSettingsService) {}

  @Query(() => ShowGeneralAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async admin_settings__general__show(): Promise<GeneralAdminSettingsObj> {
    return await this.service.show();
  }
}
