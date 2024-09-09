import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Mutation, Resolver } from '@nestjs/graphql';

import { DeleteAdminNavStylesService } from './delete.service';

@Resolver()
export class DeleteAdminNavStylesResolver {
  constructor(private readonly service: DeleteAdminNavStylesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async admin__core_styles__nav__delete(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<string> {
    return this.service.delete({ id });
  }
}
