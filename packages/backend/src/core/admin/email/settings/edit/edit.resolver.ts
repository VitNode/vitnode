import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminEmailSettingsServiceObj } from '../show/show.dto';
import { EditAdminEmailSettingsServiceArgs } from './edit.dto';
import { EditAdminEmailSettingsService } from './edit.service';

@Resolver()
export class EditAdminEmailSettingsResolver {
  constructor(private readonly service: EditAdminEmailSettingsService) {}

  @Mutation(() => ShowAdminEmailSettingsServiceObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_email_settings__edit(
    @Args() args: EditAdminEmailSettingsServiceArgs,
  ): Promise<ShowAdminEmailSettingsServiceObj> {
    return this.service.edit(args);
  }
}
