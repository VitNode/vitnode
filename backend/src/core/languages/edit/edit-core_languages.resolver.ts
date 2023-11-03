import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditCoreLanguageService } from './edit-core_languages.service';
import { ShowCoreLanguages } from '../show/dto/show-core_languages.obj';
import { EditCoreLanguagesArgs } from './dto/edit-core_languages.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class EditCoreLanguagesResolver {
  constructor(private readonly service: EditCoreLanguageService) {}

  @Mutation(() => ShowCoreLanguages)
  @UseGuards(AdminAuthGuards)
  async edit_core_languages(@Args() args: EditCoreLanguagesArgs): Promise<ShowCoreLanguages> {
    return await this.service.edit(args);
  }
}
