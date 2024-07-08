import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { EditAdminCaptchaSecurityService } from './edit.service';
import { ShowAdminCaptchaSecurityObj } from '../show/dto/show.obj';
import { EditAdminCaptchaSecurityArgs } from './dto/edit.args';

import { AdminAuthGuards } from '@/utils';

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
