import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminAuthorizationSettingsArgs } from './dto/edit.args';
import { EditAdminAuthorizationSettingsService } from './edit.service';
import { ShowAdminAuthorizationSettingsObj } from '../show/dto/show.obj';

import { AdminAuthGuards } from '@/utils';

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
