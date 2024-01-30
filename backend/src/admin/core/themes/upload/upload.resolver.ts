import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { UploadAdminThemesService } from './upload.service';
import { UploadAdminThemesArgs } from './dto/delete.args';

import { AdminAuthGuards } from '@/utils/guards/admin-auth.guards';

@Resolver()
export class UploadAdminThemesResolver {
  constructor(private readonly service: UploadAdminThemesService) {}

  @Mutation(() => String)
  @UseGuards(AdminAuthGuards)
  async core_themes__admin__upload(@Args() args: UploadAdminThemesArgs): Promise<string> {
    return await this.service.upload(args);
  }
}
