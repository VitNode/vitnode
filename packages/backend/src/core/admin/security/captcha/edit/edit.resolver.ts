import { AdminAuthGuards } from '@/utils';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { ShowAdminCaptchaSecurityObj } from '../show/show.dto';
import { EditAdminCaptchaSecurityArgs } from './edit.dto';
import { EditAdminCaptchaSecurityService } from './edit.service';

@Resolver()
export class EditAdminCaptchaSecurityResolver {
  constructor(private readonly service: EditAdminCaptchaSecurityService) {}

  @Mutation(() => ShowAdminCaptchaSecurityObj)
  @UseGuards(AdminAuthGuards)
  admin__core_security__captcha__edit(
    @Args() args: EditAdminCaptchaSecurityArgs,
  ): ShowAdminCaptchaSecurityObj {
    return this.service.edit(args);
  }
}
