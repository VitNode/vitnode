import { ShowCoreTerms } from '@/core/terms/show/show.dto';
import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { EditAdminTermsSettingsArgs } from './edit.dto';
import { EditAdminTermsSettingsService } from './edit.service';

@Resolver()
export class EditAdminTermsSettingsResolver {
  constructor(private readonly service: EditAdminTermsSettingsService) {}

  @Mutation(() => ShowCoreTerms)
  @UseGuards(AdminAuthGuards)
  async admin__core_terms_settings__edit(
    @Args() args: EditAdminTermsSettingsArgs,
  ): Promise<ShowCoreTerms> {
    return this.service.edit(args);
  }
}
