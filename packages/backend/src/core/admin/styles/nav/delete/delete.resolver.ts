import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminNavStylesArgs } from './delete.dto';
import { DeleteAdminNavStylesService } from './delete.service';

@Resolver()
export class DeleteAdminNavStylesResolver {
  constructor(private readonly service: DeleteAdminNavStylesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_styles__nav__delete(
    @Args() args: DeleteAdminNavStylesArgs,
  ): Promise<string> {
    return this.service.delete(args);
  }
}
