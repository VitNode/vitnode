import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminCoreLanguageService } from './delete.service';
import { DeleteCoreAdminLanguagesArgs } from './dto/delete.args';

@Resolver()
export class DeleteAdminCoreLanguagesResolver {
  constructor(private readonly service: DeleteAdminCoreLanguageService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_languages__delete(
    @Args() args: DeleteCoreAdminLanguagesArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
