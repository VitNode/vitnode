import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminCoreAiObj } from '../show/show.dto';
import { EditAdminCoreAiArgs } from './edit.dto';
import { EditAdminCoreAiService } from './edit.service';

@Resolver()
export class EditAdminCoreAiResolver {
  constructor(private readonly service: EditAdminCoreAiService) {}

  @Mutation(() => ShowAdminCoreAiObj)
  @UseGuards(AdminAuthGuards)
  async admin__core_ai__edit(
    @Args() args: EditAdminCoreAiArgs,
  ): Promise<ShowAdminCoreAiObj> {
    return this.service.edit(args);
  }
}
