import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminAuthorizationSettingsObj } from '../show/show.dto';
import { EditAdminAuthorizationSettingsArgs } from './edit.dto';
import { EditAdminAuthorizationSettingsService } from './edit.service';

@Resolver()
export class EditAdminAuthorizationSettingsResolver {
  constructor(
    private readonly service: EditAdminAuthorizationSettingsService,
  ) {}

  @Mutation(() => ShowAdminAuthorizationSettingsObj)
  @UseGuards(AdminAuthGuards)
  admin__core_authorization_settings__edit(
    @Args() args: EditAdminAuthorizationSettingsArgs,
  ): ShowAdminAuthorizationSettingsObj {
    return this.service.edit(args);
  }
}
