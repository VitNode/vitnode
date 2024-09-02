import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminMainSettingsArgs, EditAdminSettingsObj } from './edit.dto';
import { EditAdminMainSettingsService } from './edit.service';

@Resolver()
export class EditAdminMainSettingsResolver {
  constructor(private readonly service: EditAdminMainSettingsService) {}

  @Mutation(() => EditAdminSettingsObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_main_settings__edit(
    @Args() args: EditAdminMainSettingsArgs,
  ): Promise<EditAdminSettingsObj> {
    return this.service.edit(args);
  }
}
