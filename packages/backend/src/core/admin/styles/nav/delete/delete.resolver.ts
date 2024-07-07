import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { DeleteAdminNavStylesService } from './delete.service';
import { DeleteAdminNavStylesArgs } from './dto/delete.args';

import { AdminAuthGuards } from '../../../../../utils';

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
